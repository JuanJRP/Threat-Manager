import React from "react";
import Button from "./Button";
import { FaClipboardList, FaSkull } from "react-icons/fa";
import Link from "next/link";
import { BsFillSafeFill } from "react-icons/bs";

const UserHomeActions = () => {
  return (
    <>
      <Link href="/assets">
        <Button
          value="Gestión de Activos"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<BsFillSafeFill />}
        />
      </Link>

      <Link href="/risks">
        <Button
          value="Riesgos"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaSkull />}
        />
      </Link>
      <Link href="/action-plan">
        <Button
          value="Planes de accion"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaClipboardList />}
        />
      </Link>
      <Link href="/controls">
        <Button
          value="Controles"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaClipboardList />}
        />
      </Link>
    </>
  );
};

export default UserHomeActions;
