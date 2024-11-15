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
  const clientURL = process.env.CLIENT_HOST;
  console.log(process.env.CLIENT_HOST);
  return (
    <>
      <Link href={`${clientURL}asset-types`}>
        <Button
          value="Gestión de tipo de Activos"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaDatabase />}
        />
      </Link>
      <Link href={`${clientURL}controls`}></Link>
      <Button
        value="Controles"
        color="bg-cPurple-600"
        hover="hover:bg-cPurple-800"
        icon={<FaShieldAlt />}
      />
      <Link href={`${clientURL}vulnerability`}>
        <Button
          value="Vulnerabilidades"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaClipboardList />}
        />
      </Link>
      <Link href={`${clientURL}threats`}>
        <Button
          value="Amenazas"
          color="bg-cPurple-600"
          hover="hover:bg-cPurple-800"
          icon={<FaUserCog />}
        />
      </Link>
      <Link href={`${clientURL}risk_type`}>
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
