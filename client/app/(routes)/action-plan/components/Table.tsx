function Table() {
  return (
    <div className="m-10">
    <table className="w-full">
      <thead className="bg-zinc-400">
        <tr className="*:border *:border-zinc-300 *:p-4">
          <th className="border px-2 py-2 w-12">ID</th>
          <th className="">RESIDUAL RISK</th>
          <th>TREATMENT</th>
          <th>ACTION PLAN</th>
          <th>RESPONSIBLE</th>
          <th>IMPLEMENTATION DATE</th>
          <th>CONTROL TRACKING</th>
          <th>STATE</th>
          <th>MONITORING</th>
          <th>MONITORING DATE</th>
          <th>INDICATOR</th>
          <th>RISK</th>
          <th>RISK ID</th>
          <th>UPLOAD</th>
          <th>DELETE</th>
        </tr>
      </thead>
      <tbody className=" bg-zinc-200 text-center">
        <tr className="*:border *:border-zinc-300 *:p-3">
          <td>1</td>
          <td>Bajo</td>
          <td>Reducir</td>
          <td>Revisar configuraciones</td>
          <td>Juan Pérez</td>
          <td>15/1/2024</td>
          <td>Documentado</td>
          <td>Pendiente</td>
          <td>Monitoreo semanal</td>
          <td>15/2/2024</td>
          <td>Bajo</td>
          <td>Fuego</td>
          <td>1</td>
          <td>
            <button>✏️</button>
          </td>
          <td>
            <button>🗑️</button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  );
}

export default Table;
