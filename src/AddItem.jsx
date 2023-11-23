import React, { useState } from "react";
import Navbar from "./Navbar";

import {IoMdAdd} from 'react-icons/io';

const AddItem = () => {
  const [formData, setFormData] = useState({
    upc: "",
    nombre: "",
    modelo: "",
    color: "",
    descripcion: "",
    marca: "",
    ubicacion: "",
    imagenes: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({
      ...formData,
      imagenes: files
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("upc", formData.upc);
    form.append("nombre", formData.nombre);
    form.append("modelo", formData.modelo);
    form.append("color", formData.color);
    form.append("descripcion", formData.descripcion);
    form.append("marca", formData.marca);
    form.append("ubicacion", formData.ubicacion);

    // Agregar imágenes al formulario
    for (let i = 0; i < formData.imagenes.length; i++) {
      form.append("imagenes", formData.imagenes[i]);
    }

    try {
      const response = await fetch("http://localhost:8080/api/addItem", {
        method: "POST",
        body: form
      });

      // Manejar la respuesta del servidor según tus necesidades
      console.log(response);
    } catch (error) {
      console.error("Error al enviar la petición:", error);
    }
  };

  return (
  
    <div className="w-full py-0 max-w-3xl">
      <Navbar>
      <h1 className="text-2xl mb-1 text-center font-bold text-white">Agregar</h1>
      </Navbar>
      <div className="flex  place-content-center items-center w-screen ">
      <div className="grid grid-cols-3 gap-4 items-center">
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
          <button style={{ width: "32%" }} className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600">
            Agregar
          </button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AddItem;
