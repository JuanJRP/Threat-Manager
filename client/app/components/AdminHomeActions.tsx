import React from "react";
import Button from "./Button";
import {
  FaClipboardList,
  FaDatabase,
  FaShieldAlt,
  FaSkull,
  FaUserCog,
} from "react-icons/fa";

const AdminHomeActions = () => {
  return (
    <>
      <Button
        value="Gestión de tipo de Activos"
        color="bg-cPurple-600"
        hover="hover:bg-cPurple-800"
        icon={<FaDatabase />}
      />
      <Button
        value="Controles"
        color="bg-cPurple-600"
        hover="hover:bg-cPurple-800"
        icon={<FaShieldAlt />}
      />
      <Button
        value="Vulnerabilidades"
        color="bg-cPurple-600"
        hover="hover:bg-cPurple-800"
        icon={<FaClipboardList />}
      />
      <Button
        value="Amenazas"
        color="bg-cPurple-600"
        hover="hover:bg-cPurple-800"
        icon={<FaUserCog />}
      />

      <Button
        value="Tipo de riesgos"
        color="bg-cPurple-600"
        hover="hover:bg-cPurple-800"
        icon={<FaSkull />}
      />
    </>
  );
};

export default AdminHomeActions;
