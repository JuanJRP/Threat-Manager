"use client";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";

interface ProtectedRoutesProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoutes = ({ allowedRoles, children }: ProtectedRoutesProps) => {
  const router = useRouter();

  const accessToken = useAuthStore((state) => state.accessToken);
  useEffect(() => {
    if (!accessToken) {
      router.push("/login");
    }
  });

  return <>{children}</>;
};

export default ProtectedRoutes;
