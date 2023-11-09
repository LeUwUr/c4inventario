import React from "react";
import Navbar from "./Navbar";

const UpdateItem = () => {
  return (
    <div className="bg-white h-screen">
      <Navbar>
        <h1 className="text-2xl mb-1 text-center font-bold text-white">Actualizar articulo</h1>
        </Navbar>
      <div className="container mx-auto p-4">

        <div className="grid grid-cols-3 gap-4">
          {/* Left Column */}
          <div>
            <label className="block text-sm font-bold mb-2">UPC</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="1921501226"
            />

            <label className="block text-sm font-bold my-2">Color</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="Blanco"
            />

            <label className="block text-sm font-bold my-2">Marca</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="1921501226"
            />

            <label className="block text-sm font-bold my-2">Creado por</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="Eva Aguirre"
            />
          </div>

          {/* Middle Column */}
          <div>
            <label className="block text-sm font-bold mb-2">Nombre</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="Lampara de metal"
            />

            <label className="block text-sm font-bold my-2">Descripción</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="Lampara de mesa con cable a corriente de luz"
            />

            <label className="block text-sm font-bold my-2">Ubicación</label>
            <select className="border rounded w-full py-2 px-3">
              <option>Recepcion</option>
              {/* Add other options as needed */}
            </select>

            <label className="block text-sm font-bold my-2">Estado</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="Activo, artículo recién añadido"
            />
          </div>

          {/* Right Column */}
          <div>
            <label className="block text-sm font-bold mb-2">Modelo</label>
            <input
              className="border rounded w-full py-2 px-3"
              value="342201"
            />

            <label className="block text-sm font-bold my-2">
              Fecha de creación
            </label>
            <div className="relative">
              <input
                className="border rounded w-full py-2 px-3"
                type="date"
                value="2023-09-25"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <i className="fas fa-calendar"></i>
              </span>
            </div>

            {/* Buttons */}
            <div className="flex justify-center mt-1">
              <button className="bg-yellow-400 hover:bg-yellow-500 mt-8 w-48 text-white font-bold py-2 px-4 rounded">
                Actualizar artículo
              </button>
            </div>
            <div className="flex justify-center mt-1">
              <button className="bg-red-600 hover:bg-red-700 mt-8 w-48 text-white font-bold py-2 px-4 rounded">
                Dar de baja
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateItem;
