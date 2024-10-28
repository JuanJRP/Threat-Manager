function Filter() {
  return (
    <div className="flex  gap-2 text-2xl justify-center text-center">
      <label className="font-bold">Tipo de Riesgo :</label>

      <select className="rounded-xl w-52 text-center justify-center">
        <option value="">Seleccionar...</option>
        <option value="dog">Dog</option>
      </select>
    </div>
  );
}

export default Filter;
