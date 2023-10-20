import React from "react";

const AddItem = () => {
  return (
    <div className="p-6 w-full max-w-3xl mx-auto">
      <h1 className="text-2xl mb-4 text-center font-bold">Agregar</h1>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            UPC
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            placeholder="1921501226"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nombre
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            placeholder="Lampara de metal"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modelo
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            placeholder="342201"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            placeholder="Blanco"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Descripción
          </label>
          <input
            className="w-full px-3 py-2 border rounded-md"
            type="text"
            placeholder="Lampara de mesa con cable a corriente de luz"
          />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marca
          </label>
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Seleccionar marca</option>
          </select>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ubicación
          </label>
          <select className="w-full px-3 py-2 border rounded-md">
            <option>Seleccionar ubicación</option>
          </select>
        </div>
        <div className="col-span-3 text-right">
          <button className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
