"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useRegister } from "@/app/services/authService";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const Page = () => {
  const router = useRouter();
  const signUpMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(!isLoading);
    signUpMutation.mutate(formData, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error: any) => {
        setIsLoading(false);
        setError(
          error.response.data.message ||
            "Error al crear cuenta, revisa tus datos"
        );
      },
    });
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl h-[700px] flex overflow-hidden rounded-lg shadow-xl">
        {/* Left side - Form */}
        <div className="w-1/2 bg-gray-900 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Crear cuenta</h1>
          <h3 className="text-gray-400 mb-8">
            Completa tus datos para registrarte
          </h3>

          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first_name" className="text-gray-300 text-sm">
                  Nombre
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="last_name" className="text-gray-300 text-sm">
                  Apellido
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Tu apellido"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="text-gray-300 text-sm">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                placeholder="Elige un nombre de usuario"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-300 text-sm">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                placeholder="tu@email.com"
                required
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
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Crea una contraseña segura"
                  required
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

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? "Creando cuenta..." : "Crear cuenta"}
            </button>

            <div className="text-center text-sm text-gray-400">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/" className="text-white hover:text-purple-300">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>

        {/* Right side - Image */}
        <div className="w-1/2 relative">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/Register.png')",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
