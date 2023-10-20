import React from "react";

const UpdateItem = () => {
  return (
    <div className="bg-gray-100 h-screen">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-center text-red-600 my-4">
          Actualizar artículo
        </h1>

        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div>
            <label className="block text-sm font-bold mb-2">UPC</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="1921501226"
            />

            <label className="block text-sm font-bold my-2">Color</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="Blanco"
            />

            <label className="block text-sm font-bold my-2">Marca</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="1921501226"
            />

            <label className="block text-sm font-bold my-2">Creado por</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="Eva Aguirre"
            />
          </div>

          {/* Middle Column */}
          <div>
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="Lampara de metal"
            />

            <label className="block text-sm font-bold my-2">Descripción</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="Lampara de mesa con cable a corriente de luz"
            />

            <label className="block text-sm font-bold my-2">Ubicación</label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3">
              <option>Recepcion</option>
              {/* Add other options as needed */}
            </select>

            <label className="block text-sm font-bold my-2">Estado</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="Activo, artículo recién añadido"
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-sm font-bold mb-2">Modelo</label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3"
              value="342201"
            />

            <label className="block text-sm font-bold my-2">
              Fecha de creación
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3"
                type="date"
                value="2023-09-25"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-calendar"></i>
              </span>
            </div>

            {/* Buttons */}
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 mt-6 rounded">
              Actualizar artículo
            </button>
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded">
              Dar de baja
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
