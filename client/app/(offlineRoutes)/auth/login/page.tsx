// /app/auth/login/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useLogin } from "@/app/services/authService";
import { useRouter } from "next/navigation";
import Button from "@/app/components/Button";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginMutation = useLogin();
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    loginMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error: any) => {
        setIsLoading(false);
        setError(
          error.response.data.message ||
            "Error al iniciar sesión, revisa tus credenciales"
        );
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl h-[600px] flex overflow-hidden rounded-lg shadow-xl">
        {/* Left side - Form */}
        <div className="w-1/2 bg-gray-900 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Iniciar sesión</h1>
          <h3 className="text-gray-400 mb-8">Ingresa los datos de tu cuenta</h3>
          {error && (
            <div className="bg-red-500 text-white p-2 rounded-lg mb-4 text-center">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-gray-300 text-sm">
                Usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData["username"]}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                placeholder="Ingrese su usuario"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-gray-300 text-sm">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData["password"]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Ingrese su contraseña"
                />
                <span
                  onClick={handleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? (
                    <FaRegEyeSlash color="white" />
                  ) : (
                    <FaRegEye color="white" />
                  )}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <a
                href="/register#"
                className="text-purple-400 hover:text-purple-300"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div className="flex items-center justify-center">
              <Button
                value={isLoading ? "Ingresando..." : "Iniciar sesion"}
                type="submit"
                disabled={isLoading ? true : false}
              />
            </div>

            <div className="text-center text-sm text-gray-400">
              ¿No tienes cuenta?{" "}
              <a href="/auth/register" className="text-white hover:text-purple-300">
                Regístrate
              </a>
            </div>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Login.png')",
            }}
          />
        </div>
      </div>
    </div>
  );
}
