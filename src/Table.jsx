import React from "react";

function InventoryTable() {
  const inventoryData = [
    {
      UPC: "84998006979",
      NOMBRE: "Escritorio de metal",
      UBICACION: "Recepcion",
      CREADO_POR: "Eva Aguirre"
    },
    {
      UPC: "819215021232",
      NOMBRE: "Lampara de metal",
      UBICACION: "Recepcion",
      CREADO_POR: "Eva Aguirre"
    },
    {
      UPC: "683609866729",
      NOMBRE: "Bote de basura",
      UBICACION: "Sala de juntas",
      CREADO_POR: "Howard Garcia"
    },
    {
      UPC: "683609866729",
      NOMBRE: "Bote de basura",
      UBICACION: "Sala de juntas",
      CREADO_POR: "Howard Garcia"
    }
    // ... add other items here
  ];

  return (
    
    <div className="w-full px-20 py-2">
      <h1 className="text-2xl font-bold text-red-900 mb-5 text-center">
        Inventario
        </h1>
      <table className="mx-auto min-w-full text-center bg-white">
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
                {/* Marked change */}
                <button className="bg-sky-400 text-white px-4 py-2 mr-2 rounded">
                  Actualizar
                </button>{" "}
                {/* Marked change */}
                <button className="bg-red-800 text-white px-4 py-2 rounded">
                  Baja
                </button>{" "}
                {/* Marked change */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
