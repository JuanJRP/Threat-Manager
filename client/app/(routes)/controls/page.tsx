"use client";
import { useQuery } from "@tanstack/react-query";
import { createControl, deleteControl, getAllControls } from "./controlServices";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateForm from "@/app/components/CreateForm";
import useModalStore from "@/app/store/modalStore";
import Table from "@/app/components/Table";
import Loading from "@/app/components/Loading";
import ErrorComponent from "@/app/components/ErrorComponent";
import { LuPlus, LuAlertTriangle } from "react-icons/lu";

import Link from "next/link";

const ControlsPage = () => {
  const { openModal } = useModalStore();

  const {
    data: controls,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["controls"],
    queryFn: async () => await getAllControls(),
  });

  if (isLoading) return <Loading />;

  if (isError) return <Error />;

  return (
    <>
      <div className="flex items-center justify-center gap-y-8 mt-8 gap-x-4">
        <Button
          value="Agregar control"
          onClick={openModal}
          icon={<LuPlus size={"1.5rem"} />}
        />
      </div>
      <h2 className="font-semibold text-xl text-center">
        Aqui tienes toda la información acerca de tus controles
      </h2>
      <div className=" flex justify-center">
        <Table
          data={controls}
          columns={[
            "code",
            "description_iso",
            "description_city_hall"
          ]}
          columnNames={{
            ["code"]: "Codigo",
            ["description_iso"]: "Descripción de la iso",
            ["description_city_hall"]: "Descripción de la alcaldía"
          }}
          details={"controls"}
          deleteFunction={deleteControl}
        />
      </div>
      <Modal name="Controles">
        <CreateForm
          module="controls"
          createData={createControl}
        />
      </Modal>
    </>
  );
};

export default ControlsPage;
