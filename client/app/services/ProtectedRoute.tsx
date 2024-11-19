"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import { usePathname, useRouter } from "next/navigation";

const publicRoutes = ["/auth/login", "/auth/register"];

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, pathname]);

  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
