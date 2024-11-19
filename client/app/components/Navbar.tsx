"use client";
import Link from "next/link";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useAuthStore } from "../store/authStore";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { logout } from "../services/authService"; // Importa la función de logout

interface NavProps {
  title: string;
}

const Nav: React.FC<NavProps> = ({ title }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated); // Función para actualizar el estado
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // Llama al servicio de logout
      setIsAuthenticated(false); // Actualiza el estado global
      router.push("/auth/login"); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="text-cPurple-50 relative h-20 flex items-center justify-center w-full py-2 mb-5">
      <div className="bg-cPurple-950 relative h-full w-[100%] flex items-center justify-center rounded-xl p-2">
        {/* Icono a la izquierda */}
        <Link
          href="/"
          className="flex items-center absolute left-3 hover:brightness-75 transition cursor-pointer"
        >
          <FaRegArrowAltCircleLeft size={"2em"} />

        </Link>

        {/* Título centrado */}
        <h1 className="text-center font-semibold text-3xl">{title}</h1>

        {/* Botón de cerrar sesión */}
        {isAuthenticated && (
          <div className="absolute right-3 hover:brightness-75 transition cursor-pointer">
            <Button
              value="Cerrar Sesión"
              color="bg-cPurple-100"
              textColor="text-cPurple-700"
              hover="hover:bg-cPurple-200"
              onClick={handleLogout} // Agrega el evento de clic
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
