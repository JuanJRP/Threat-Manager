import React, { ReactNode } from "react";
import ProtectedRoute from "../services/ProtectedRoute";

const layout = ({ children }: { children: ReactNode }) => {
  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default layout;
