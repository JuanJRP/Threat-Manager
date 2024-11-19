"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Button from "../../components/Button";
import { FaPlusCircle } from "react-icons/fa";
import useModalStore from "@/app/store/modalStore";
import { useQuery } from "@tanstack/react-query";
import {
  CreateAssetTypes,
  DeleteAssetTypesById,
  EditAssetTypesById,
  getAllAssetTypes,
} from "./assetTypeServices";
import Table from "@/app/components/Table";
import Modal from "@/app/components/Modal";
import CreateForm from "@/app/components/CreateForm";
import SearchBar from "./components/SearchBar";
import { AssetType } from "./components/interface";
import Loading from "@/app/components/Loading";
import ErrorComponent from "@/app/components/ErrorComponent";

export default function Home() {
  const [isUserSearching, setIsUserSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { openModal } = useModalStore();
  const { data: assetTypes = [], isLoading, isError} = useQuery<AssetType[]>({
    queryKey: ["assets_type"],
    queryFn: async () => getAllAssetTypes(),
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorComponent />;

  const filteredAssetsTypes = (): AssetType[] => {
    if (!searchQuery) return assetTypes;
    const lowerCaseQuery = searchQuery.toLowerCase();
    return assetTypes.filter(
      (asset) =>
        asset.name.toLowerCase().includes(lowerCaseQuery) ||
        asset.description.toLowerCase().includes(lowerCaseQuery) ||
        asset.category.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const dataToShow = !isUserSearching ? assetTypes : filteredAssetsTypes();

  return (
    <div>
      <Navbar title="TIPO DE ACTIVO" />
      <header className="flex items-center justify-center mt-16 mb-8">
        <div className="flex flex-col items-center justify-center gap-5 bg-cPurple-100 h-64 w-[670px] p-4 py-10 rounded-xl shadow-black shadow-md ">
          <SearchBar
            setIsUserSearching={setIsUserSearching}
            setSearchQuery={setSearchQuery}
          />
          <Button
            value="Agregar tipo de activo"
            onClick={openModal}
            icon={<FaPlusCircle />}
          />
        </div>
      </header>
      <Table
        data={dataToShow}
        columns={["name", "description", "category"]}
        columnNames={{
          ["name"]: "Nombre",
          ["description"]: "Descripcion",
          ["category"]: "Categoria",
        }}
        details={"assets_type"}
        deleteFunction={DeleteAssetTypesById}
        updateFunction={EditAssetTypesById}
      />
      <Modal name="Planes de accion">
        <CreateForm module="assets_type" createData={CreateAssetTypes} />
      </Modal>
    </div>
  );
}
