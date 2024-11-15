"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import authService from './services/authService';

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await authService.login({
        username: formData.username,
        password: formData.password
      });

      localStorage.setItem('accessToken', response.accessToken);
      
      // Redirige al usuario a la página principal
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-6xl h-[600px] flex overflow-hidden rounded-lg shadow-xl">
        {/* Left side - Form */}
        <div className="w-1/2 bg-gray-900 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">Iniciar sesión</h1>
          <h3 className="text-gray-400 mb-8">Ingresa los datos de tu cuenta</h3>

          {error && (
            <div className="mb-4 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded-lg text-red-500">
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
                value={formData.username}
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
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                  placeholder="Ingrese su contraseña"
                />
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <a href="/register#" className="text-purple-400 hover:text-purple-300">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Cargando...' : 'Iniciar sesión'}
            </button>

            <div className="text-center text-sm text-gray-400">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-white hover:text-purple-300">
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
              backgroundImage: "url('/Login.png')"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;