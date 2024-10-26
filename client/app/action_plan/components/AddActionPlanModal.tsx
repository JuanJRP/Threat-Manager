import Button from "./Button";
import Input from "./Input";
import Select from "./Select";

function AddActionPlanModal() {
  return (
    <div className="absolute flex bg-zinc-300 w-screen h-screen z-10 bg-opacity-70 justify-center ">
      <div className="bg-cPurple-50 w-[1200px] h-[850px] border border-black my-6 rounded-md">
        <div className="relative flex border-b-2 border-black text-center justify-center items-center font-bold h-11 text-2xl">
          AGREGAR PLAN DE ACCION

          <button className="absolute size-9 right-3 hover:fill-zinc-600 transition">
            <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
              <path d="M25 50C11.1929 50 0 38.807 0 25C0 11.1929 11.1929 0 25 0C38.807 0 50 11.1929 50 25C50 38.807 38.807 50 25 50ZM25 45C36.0457 45 45 36.0457 45 25C45 13.9543 36.0457 5 25 5C13.9543 5 5 13.9543 5 25C5 36.0457 13.9543 45 25 45ZM25 21.4645L32.071 14.3934L35.6065 17.9289L28.5355 25L35.6065 32.071L32.071 35.6065L25 28.5355L17.9289 35.6065L14.3934 32.071L21.4645 25L14.3934 17.9289L17.9289 14.3934L25 21.4645Z" />
            </svg>
          </button>
          
        </div>
        <main className="flex m-20 gap-10">
          <div className="flex flex-col gap-10 mr-10">
            <Select title="Residual Risk" option="Seleccionar" />
            <Input title="Treatment" type="text" placeholder="Escribe..." />
            <Input title="Action Plan" type="text" placeholder="Escribe..." />
            <Input title="Responsible" type="text" placeholder="Escribe..." />
            <Input title="Implementation Date" type="date" placeholder="dd/mm/yyyy" />
          </div>

          <div className="flex flex-col gap-10 mr-10">
            <Input title="Control Tracking" type="text" placeholder="Escribe..." />
            <Select title="State" option="Seleccionar" />
            <Input title="Monitoring" type="text" placeholder="Escribe..." />
            <Input title="Monitoring Date" type="date" placeholder="dd/mm/yyyy" />
            <Input title="Indicator" type="text" placeholder="Escribe..." />
          </div>

          <div className="flex flex-col gap-10 mr-10">
            <Input title="Risk" type="text" placeholder="Escribe..." />
            <Input title="Risk ID" type="text" placeholder="Escribe..." />
          </div>
        </main>

        <div className="flex items-center justify-center mt-44">
          <Button text="Agregar" />
        </div>
      </div>
    </div>
  );
}

export default AddActionPlanModal;
