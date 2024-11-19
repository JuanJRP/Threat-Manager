import React from "react";
import Button from "./Button";
import {
  FaClipboardList,
  FaDatabase,
  FaShieldAlt,
  FaSkull,
  FaUserCog,
} from "react-icons/fa";
import Link from "next/link";

const AdminHomeActions = () => {
  return (
    <>
      <Link href={`/asset-types`}>
        <Button
          value="Gestión de tipo de Activos"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaDatabase />}
        />
      </Link>
      <Link href={`/controls`}>
        <Button
          value="Controles"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaShieldAlt />}
        />
      </Link>
      <Link href={`/vulnerability`}>
        <Button
          value="Vulnerabilidades"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaClipboardList />}
        />
      </Link>
      <Link href={`/threats`}>
        <Button
          value="Amenazas"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaUserCog />}
        />
      </Link>
      <Link href={`/risk_type`}>
        <Button
          value="Tipo de riesgos"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaSkull />}
        />
      </Link>
    </>
  );
};

export default AdminHomeActions;
