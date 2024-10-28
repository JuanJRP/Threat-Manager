import Nav from "@/app/components/Navbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="min-h-screen w-full
  "
    >
      <Nav title="Riesgos" />
      {children}
    </div>
  );
};

export default layout;
