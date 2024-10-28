import Link from "next/link";
import Button from "./components/Button";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-cPurple-100 text-center px-4">
      <h2 className="text-9xl font-bold text-cPurple-900">¡Oh, no!</h2>
      <p className="text-2xl text-gray-700 mb-2">
        La página que buscas no existe.
      </p>
      <p className="text-lg text-gray-500 mb-8">
        Pero no te preocupes, puedes regresar al inicio.
      </p>
      <Link href="/">
        <Button value="Volver al Inicio" />
      </Link>
    </div>
  );
}
