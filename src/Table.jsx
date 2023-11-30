import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { AiFillBell } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { CgAdd } from 'react-icons/cg';
import { RxExit } from 'react-icons/rx';
import { SiMicrosoftexcel } from 'react-icons/si';
import * as XLSX from 'xlsx';
import { useLoginContext } from "./LoginContext";


function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  // Function to handle logout using the useNavigate hook
  const navigate = useNavigate();
  const { userData } = useLoginContext();

  useEffect(() => {

    const storedUserData = localStorage.getItem('userData');

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      // Establecer el estado de autenticación utilizando userData
      // Por ejemplo, podrías establecer el usuario autenticado o un token
    }

    // Assuming you fetch data from the server using the provided endpoint
    fetch('http://localhost:8080/api/getAllArtInfo')
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'SUCCESS') {
          setInventoryData(data.data);
        } else {
          console.error('Failed to fetch inventory data');
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to handle input change and filter data
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    console.log("Changing to page:", page);
    setCurrentPage(page);
  };

  const filteredData = inventoryData.filter(
    (item) =>
      item.Num_Referencia.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Ubicacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.Resguardante.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    const confirmLogout = window.confirm("¿Está seguro de que desea cerrar sesión?");

    if (confirmLogout) {
      // Limpiar la información de sesión del localStorage
      localStorage.removeItem('userData');
      navigate('/login');
    }
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Articulo');
    XLSX.writeFile(workbook, 'articulo_data.xlsx');
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getArtByID/${productId}`);
      const data = await response.json();

      if (data.status === 'SUCCESS') {
        openModal(data.data);
      } else {
        console.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  const openModal = async (productDetails) => {

    setSelectedItem(productDetails);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const openUpdateModal = (item) => {
    setSelectedUpdateItem(item);
    setUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setSelectedUpdateItem(null);
    setUpdateModalOpen(false);
  };

  const openUserInfoModal = () => {
    setUserInfoModalOpen(true);
  };

  const closeUserInfoModal = () => {
    setUserInfoModalOpen(false);
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };


  // Calcular el índice de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  // Obtener los elementos de la página actual
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(inventoryData.length / itemsPerPage) || 1;

  return (
    <div className="w-full py-0">
      {/* Navbar */}
      <nav className="bg-amber-950 p-2 mb-5 text-center w-screen">
        <div className="flex items-center justify-between"> {/* Added justify-between */}
          <div className="flex justify-center items-center w-full ml-28">
            <input
              type="text"
              placeholder="Buscar..."
              className="bg-white p-2 rounded-full w-6/12"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center space-x-6 mr-20">

            {/* Button with Excel icon for downloading */}
            <button onClick={downloadExcel}>
              <SiMicrosoftexcel alt="Descargar" className="text-white w-10 h-10" />
            </button>

            <Link to='/agregar'>
              <CgAdd alt='Agregar' className="text-white w-10 h-10" />
            </Link>

            <AiFillBell alt='Notificaciones' className="text-white w-10 h-10" />

            <BiSolidUser
              alt="user"
              className="text-white w-10 h-10 cursor-pointer"
              onClick={openUserInfoModal}
            />
            <button onClick={handleLogout}>
              <RxExit alt='Cerrar sesion' className="text-white w-10 h-10" />

            </button>

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
          {currentItems.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-transparent">{item.Num_Referencia}</td>
              <td className="py-2 px-4 border-transparent">{item.Nombre}</td>
              <td className="py-2 px-4 border-transparent">{item.Ubicacion}</td>
              <td className="py-2 px-4 border-transparent">{item.Resguardante}</td>

              <td className="py-2 w-auto border-transparent">
                <button
                  className="bg-lime-600 text-white px-6 py-2 mr-2 rounded"
                  onClick={() => fetchProductDetails(item.Num_Referencia)}
                >
                  Detalles
                </button>{" "}
                <button
                  className="bg-sky-400 text-white px-4 py-2 mr-2 rounded"
                  onClick={() => openUpdateModal(item)}
                >
                  Actualizar
                </button>{" "}
                <button className="bg-red-800 text-white px-8 py-2 rounded">
                  Baja
                </button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Numeric pagination */}
      <di className="flex justify-center items-center mt-4">
        {/* Botón para ir a la página anterior */}
        <button
          className={`mx-1 px-6 py-4 border rounded-full ${currentPage === 1 ? 'bg-gray-300' : 'bg-white'}`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <strong>{"<"}</strong>
        </button>

        {/* Modal */}
        {isModalOpen && selectedItem && (
          <div className="fixed inset-0 flex items-center justify-center">
            {/* Background overlay */}
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={closeModal}></div>
            {/* Modal content */}
            <div className="bg-white border border-gray-300 rounded-md h-3/5 w-4/6 p-6 relative z-10">
              {/* Content for the modal */}
              <h2 className="text-2xl font-bold mb-4">Detalles del Artículo</h2>

              <div className="flex">
                <div className="w-1/2 pr-4">
                  <p><strong>UPC:</strong> {selectedItem.id || 'Desconocido'}</p>
                  <p><strong>Serial:</strong> {selectedItem.NSerial || 'Desconocido'}</p>
                  <p><strong>Nombre:</strong> {selectedItem.Nombre || 'Desconocido'}</p>
                  <p><strong>Modelo:</strong> {selectedItem.Modelo || 'Desconocido'}</p>
                  <p><strong>Descripción:</strong> {selectedItem.Descripcion || 'Desconocido'}</p>
                  <p><strong>Fecha de creación:</strong> {selectedItem.FechaCreacion || 'Desconocido'}</p>
                </div>
                <div className="w-1/2 pl-4">
                  <p><strong>Marca:</strong> {selectedItem.Marca || 'Desconocido'}</p>
                  <p><strong>Resguardante:</strong> {selectedItem.Resguardante || 'Desconocido'}</p>
                  <p><strong>Ubicación:</strong> {selectedItem.location || 'Desconocido'}</p>
                  <p><strong>Municipio:</strong> {selectedItem.Municipio || 'Desconocido'}</p>
                  <p><strong>Estado:</strong> {selectedItem.estado || 'Desconocido'}</p>
                </div>
              </div>

              {/* Add more details as needed */}
              {selectedItem.images && selectedItem.images.length > 0 ? (
                <div className="mt-4">
                  <p><strong>Imágenes:</strong></p>
                  <div className="flex">
                    {selectedItem.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Imagen ${index + 1}`}
                        className="max-w-full h-auto object-contain mr-2 mb-2 cursor-pointer"
                        onClick={() => openImageModal(image)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <p>Sin imágenes disponibles</p>
              )}
              {/* Botón "Cerrar" posicionado en la esquina inferior derecha */}
              <button className="absolute bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal de imagen */}
        {isImageModalOpen && selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={closeImageModal}></div>
            <div className="bg-white border border-gray-300 rounded-md p-6 relative z-10 max-w-screen-lg">
              <img src={selectedImage} alt="Imagen ampliada" className="max-w-full max-h-screen object-contain" />
              <button className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeImageModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal for Actualizar button */}
        {isUpdateModalOpen && selectedUpdateItem && (
          <div className="fixed inset-0 flex items-center justify-center">
            {/* Background overlay */}
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={closeUpdateModal}></div>
            {/* Modal content */}
            <div className="bg-white border border-gray-300 rounded-md h-3/5 w-4/6 p-6 relative z-10">
              {/* Content for the modal */}
              <h2 className="text-2xl font-bold mb-4">Actualizar Artículo</h2>
              {/* Add form or content for updating */}
              {/* Example form field: */}
              <input type="text" placeholder="Nuevo Nombre" />
              {/* Add more fields as needed */}
              <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={closeUpdateModal}>
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

        {/* Ventana emergente con la información del usuario */}
        {isUserInfoModalOpen && (
          <div className="fixed top-16 right-25 w-5/6 flex flex-col items-end">
            {/* Background overlay */}
            <div className="fixed inset-0" onClick={closeUserInfoModal}></div>
            <div className="bg-white p-4 rounded-md shadow-lg shadow-black">
              <p className="text-xl text-center text-amber-950 mb-2"><strong>Mi cuenta</strong></p>
              <p className="mb-1"><strong>Nombre:</strong> {userData.firstName}</p>
              <p className="mb-1"><strong>Apellido:</strong> {userData.lastName}</p>
              <p><strong>Correo:</strong> {userData.email}</p>
              <button className="static bg-amber-950 text-white px-4 py-2 rounded mt-4" onClick={closeUserInfoModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Mapear solo la cantidad necesaria de botones de página */}
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <button
            key={page}
            className={`mx-1 px-6 py-4 border rounded-full ${currentPage === page ? 'bg-amber-500' : 'bg-white'}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        {/* Botón para ir a la página siguiente */}
        <button
          className={`mx-1 px-6 py-4 border rounded-full ${currentPage === totalPages ? 'bg-gray-300' : 'bg-white'}`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <strong>{">"}</strong>
        </button>
      </di>

    </div >

  );
}

export default InventoryTable;