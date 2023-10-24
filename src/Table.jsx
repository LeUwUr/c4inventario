import React from "react";
import { CgAdd } from 'react-icons/cg';
import { AiFillBell } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { RxExit } from 'react-icons/rx';

function InventoryTable() {
  const inventoryData = [
    {
      UPC: "84998006979",
      NOMBRE: "Escritorio de metal",
      UBICACION: "Recepcion",
      CREADO_POR: "Eva Aguirre",
    },
    {
      UPC: "819215021232",
      NOMBRE: "Lampara de metal",
      UBICACION: "Recepcion",
      CREADO_POR: "Eva Aguirre",
    },
    {
      UPC: "683609866729",
      NOMBRE: "Bote de basura",
      UBICACION: "Sala de juntas",
      CREADO_POR: "Howard Garcia",
    },
    {
      UPC: "683609866729",
      NOMBRE: "Bote de basura",
      UBICACION: "Sala de juntas",
      CREADO_POR: "Howard Garcia",
    }
    // ... add other items here
  ];

  return (
    <div className="w-full py-0">
      {/* Navbar */}
      <nav className="bg-red-900 p-2 mb-5 text-center w-screen">
        <div className="flex items-center justify-between"> {/* Added justify-between */}
        <div className="flex justify-center items-center w-full ml-28">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-white p-2 rounded-full w-8/12"
            />
          </div>
          <div className="flex items-center space-x-6 mr-20">
            <CgAdd alt='Agregar' className="text-white w-10 h-10" />
            <AiFillBell alt='Notificaciones' className="text-white w-10 h-10" />
            <BiSolidUser alt='Usuario' className="text-white w-10 h-10" />
            <RxExit alt='Cerrar sesion' className="text-white w-10 h-10" />
          </div>
        </div>
      </nav>

      <h1 className="text-2xl font-bold text-red-900 mb-5 text-center">
        Inventario
      </h1>
      <table className="mx-auto w-10/12 text-center bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border text-white bg-amber-500">UPC</th>
            <th className="py-2 px-4 border text-white bg-amber-500">NOMBRE</th>
            <th className="py-2 px-4 border text-white bg-amber-500">UBICACION</th>
            <th className="py-2 px-4 border text-white bg-amber-500">CREADO POR</th>
            <th className="py-2 px-4 border text-white bg-amber-500">OPCIONES</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.UPC}>
              {Object.values(item).map((value, index) => (
                <td
                  key={index}
                  className={`py-2 px-4 border-transparent ${
                    index === 4 ? "text-center" : ""
                  }`}
                >
                  {value}
                </td>
              ))}
              <td className="py-2 px-4 border-transparent">
                <button className="bg-lime-600 text-white px-4 py-2 mr-2 rounded">
                  Detalles
                </button>{" "}
                <button className="bg-sky-400 text-white px-4 py-2 mr-2 rounded">
                  Actualizar
                </button>{" "}
                <button className="bg-red-800 text-white px-4 py-2 rounded">
                  Baja
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
