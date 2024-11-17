"use client";
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { DeleteAssetById } from "./assetServices";
import AddAssetModal from "./components/Modals/AddAssets";
import Nav from "../../components/Navbar";
import Table from "./components/DataTable/Table";
import SearchBar from "./components/DataTable/SearchBar";
import ActionButtons from "./components/DataTable/ActionButtons";
import Pagination from "./components/DataTable/Pagination";
import { Asset, Column } from "./components/Interface";
import EditAssetModal from "./components/Modals/EditAssets";
import DeleteModal from "./components/Modals/DeleteModal";
import CSVImportModal from "./components/Modals/ImportCSV";

const ROWS_PER_PAGE = 6;

const Page = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [newColumnName, setNewColumnName] = useState("");
  const [columns, setColumns] = useState<Column[]>([]);
  const [showColumnsSettings, setShowColumnsSettings] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState<string | null>(null);
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);

  const fetchAssets = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/assets/");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setAssets(data);
      setFilteredAssets(data);
      if (data.length > 0) {
        const initialColumns = Object.keys(data[0]).map((key) => ({
          key,
          label: key.charAt(0).toUpperCase() + key.slice(1),
          type: "string", // or any default type you want to set
          visible: true,
        }));
        setColumns(initialColumns);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredAssets(assets);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(" ");
    const filtered = assets.filter((asset) => {
      return searchTerms.every((term) => {
        return Object.values(asset).some((value) =>
          value?.toString().toLowerCase().includes(term)
        );
      });
    });

    setFilteredAssets(filtered);
  }, [searchQuery, assets]);

  const handleCSVImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      complete: async (results) => {
        if (
          results.data &&
          Array.isArray(results.data) &&
          results.data.length > 0
        ) {
          const csvColumns = Object.keys(results.data[0] as object).map(
            (key) => ({
              key,
              label: key.charAt(0).toUpperCase() + key.slice(1),
              visible: true,
            })
          );

          setColumns((prev) => {
            const updatedColumns = [...prev];
            csvColumns.forEach((csvCol) => {
              if (!updatedColumns.find((col) => col.key === csvCol.key)) {
                updatedColumns.push(csvCol);
              }
            });
            return updatedColumns;
          });

          for (const row of results.data) {
            const asset: Partial<Asset> = {};
            csvColumns.forEach((col) => {
              if (col.key !== "id") {
                asset[col.key] = (row as { [key: string]: any })[col.key] || "";
              }
            });

            try {
              const response = await fetch(
                "http://localhost:3001/api/assets/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(asset),
                }
              );

              if (!response.ok) {
                console.error(
                  `Error al procesar fila: ${JSON.stringify(asset)}`
                );
                throw new Error(
                  `Error en la solicitud: ${response.statusText}`
                );
              }
            } catch (error) {}
          }

          // Actualizar la lista de assets después de procesar todo el CSV
          await fetchAssets();
        }
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleDelete = async () => {
    if (assetToDelete) {
      try {
        await DeleteAssetById(assetToDelete);
        await fetchAssets();
        setIsDeleteModalOpen(false);
        setAssetToDelete(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    }
  };

  const totalPages = Math.ceil(filteredAssets.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const endIndex = startIndex + ROWS_PER_PAGE;
  const currentAssets = filteredAssets.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 gap-y-2">
        <h2 className="text-center font-semibold text-3xl">Cargando...</h2>
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-6 my-4">
        <p className="text-red-800 text-lg">
          Error al cargar los datos: {error}
        </p>
        <button
          onClick={fetchAssets}
          className="mt-4 px-6 py-3 bg-red-100 text-red-800 rounded-md hover:bg-red-200 text-lg"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 w-full min-h-screen">
      <Nav title="Activos" />

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <ActionButtons
        onAddClick={() => setIsAddModalOpen(true)}
        onCSVImport={() => setIsCSVModalOpen(true)}
        onSettingsClick={() => setShowColumnsSettings(!showColumnsSettings)}
        ButtonName="Activo"
      />

      <Table
        columns={columns}
        currentAssets={currentAssets}
        onEdit={(asset) => {
          setSelectedAsset(asset);
          setIsEditModalOpen(true);
        }}
        onDelete={(assetId) => {
          setAssetToDelete(assetId);
          setIsDeleteModalOpen(true);
        }}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={filteredAssets.length}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
      />

      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAssetAdded={fetchAssets}
        columns={columns}
        name="Activo"
      />

      <EditAssetModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedAsset(null);
        }}
        asset={selectedAsset}
        onAssetUpdated={fetchAssets}
        columns={columns}
        name="Activo"
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setAssetToDelete(null);
        }}
        onConfirm={handleDelete}
        itemName="EL ACTIVO"
      />

      <CSVImportModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
        onFileSelect={handleCSVImport}
      />

      {showColumnsSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-xl font-semibold mb-4">Configurar Columnas</h2>

            <div className="mb-6">
              <div className="flex gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Nombre de nueva columna"
                  className="flex-1 p-2 border rounded"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                />
                <button
                  onClick={() => {
                    if (newColumnName.trim()) {
                      const columnKey = newColumnName
                        .toLowerCase()
                        .replace(/\s+/g, "_");
                      setColumns((prev) => [
                        ...prev,
                        {
                          key: columnKey,
                          label: newColumnName,
                          visible: true,
                        },
                      ]);
                      setNewColumnName("");
                      setShowColumnModal(false);
                    }
                  }}
                  className="px-4 py-2 bg-cPurple-800 text-white rounded hover:bg-cPurple-700"
                >
                  Agregar
                </button>
              </div>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {columns.map((column) => (
                <div key={column.key} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={column.visible}
                    onChange={() => {
                      setColumns((prev) =>
                        prev.map((col) =>
                          col.key === column.key
                            ? { ...col, visible: !col.visible }
                            : col
                        )
                      );
                    }}
                    className="w-4 h-4"
                    title={`Toggle visibility for ${column.label}`}
                  />
                  <span>{column.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowColumnsSettings(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
