import Link from "next/link";
import Button from "./Button";
import { BsArrowRepeat } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";


export default function ErrorComponent() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
      <div className="text-red-500 text-7xl mb-4">⚠️</div>
      <h2 className="text-4xl font-semibold text-gray-800 mb-2">
        ¡Algo salió mal!
      </h2>
      <p className="text-lg text-gray-600 mb-4">
        No hemos podido completar la acción. Por favor, intenta nuevamente.
      </p>
      <div className="flex gap-4 mt-6">
        <Button
          value="Reintentar"
          onClick={() => window.location.reload()}
          icon={<BsArrowRepeat />}
        />

        <Link href="/">
          <Button
            value="Volver al Inicio"
            color="bg-cPurple-50"
            textColor="text-gray-800"
            borderColor="border-cPurple-600"
            hover="hover:bg-cPurple-200"
            icon={<IoHomeSharp />}
          />
        </Link>
      </div>
    </div>
  );
}
