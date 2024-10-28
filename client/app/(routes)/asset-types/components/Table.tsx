function Table() {
  return (
    <div className="m-10">
      <table className="w-full">
        <thead className="bg-zinc-400">
          <tr className="*:border *:border-zinc-300 *:p-4">
            <th>ID</th>
            <th>NAME</th>
            <th>DESCRIPTION</th>
            <th>CATEGOTY</th>
            <th>ASSET</th>
            <th>RISK ID</th>
            <th>UPLOAD</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody className=" bg-zinc-200 text-center">
          <tr className="*:border *:border-zinc-300 *:p-3">
            <td>1</td>
            <td>Servidor Web</td>
            <td>Servidor dedicado para hosting web</td>
            <td>Infraestructura</td>
            <td>Servidor Apache</td>
            <td>Medio</td>
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
