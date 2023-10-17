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
    }
    // ... add other items here
  ];

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border">UPC</th>
          <th className="py-2 px-4 border">NOMBRE</th>
          <th className="py-2 px-4 border">UBICACION</th>
          <th className="py-2 px-4 border">CREADO POR</th>
          <th className="py-2 px-4 border">OPCIONES</th>
        </tr>
      </thead>
      <tbody>
        {inventoryData.map((item) => (
          <tr key={item.UPC}>
            <td className="py-2 px-4 border">{item.UPC}</td>
            <td className="py-2 px-4 border">{item.NOMBRE}</td>
            <td className="py-2 px-4 border">{item.UBICACION}</td>
            <td className="py-2 px-4 border">{item.CREADO_POR}</td>
            <td className="py-2 px-4 border">
              <button className="bg-blue-500 text-white px-4 py-2 mr-2 rounded">
                Detalles
              </button>{" "}
              {/* Marked change */}
              <button className="bg-green-500 text-white px-4 py-2 mr-2 rounded">
                Actualizar
              </button>{" "}
              {/* Marked change */}
              <button className="bg-red-500 text-white px-4 py-2 rounded">
                Eliminar
              </button>{" "}
              {/* Marked change */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default InventoryTable;
