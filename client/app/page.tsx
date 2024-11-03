import AdminHomeActions from "./components/AdminHomeActions";
import Nav from "./components/Navbar";
import UserHomeActions from "./components/UserHomeActions";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen  text-cPurple-950">
      <Nav title="Sistema Gestor de Riesgos" />

      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <div className="bg-cPurple-200 p-10 sm:p-16 xl:p-60 2xl:p-80 rounded-md shadow-md shadow-cPurple-600">
          <h1 className="text-4xl font-bold mb-4 text-center">
            Bienvenido al Gestor de Riesgos
          </h1>

          <div className="w-full h-1 bg-cPurple-600 rounded-full my-4"></div>

          <p className="text-lg text-center mb-8 text-cPurple-600 italic">
            "El primer paso para gestionar el riesgo es comprenderlo"
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <UserHomeActions />
          </div>
        </div>
      </main>
    </div>
  );
}
