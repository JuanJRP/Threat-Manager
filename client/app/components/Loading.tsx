import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 gap-y-2">
      <h2>Cargando...</h2>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Loading;
