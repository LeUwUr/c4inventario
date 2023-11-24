import React, {useState, useEffect} from "react";
import { Link, useNavigate } from 'react-router-dom';

import { CgAdd } from 'react-icons/cg';
import { AiFillBell } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { RxExit } from 'react-icons/rx';
import { SiMicrosoftexcel } from 'react-icons/si';
import * as XLSX from 'xlsx';


function InventoryTable() {
  const [inventoryData, setInventoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedItem, setSelectedItem] = useState(null);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // Function to handle logout using the useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
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
    // Show a confirmation dialog
    const confirmLogout = window.confirm("¿Está seguro de que desea cerrar sesión?");

    // If the user confirms, perform logout logic and redirect to the login page
    if (confirmLogout) {
      // Perform logout logic (clear authentication, etc.)
      navigate('/login');
    }
    // If the user cancels, do nothing
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Articulo');
    XLSX.writeFile(workbook, 'articulo_data.xlsx');
  };

  // Function to open the modal
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  // Function to open the update modal
  const openUpdateModal = (item) => {
    setSelectedUpdateItem(item);
    setUpdateModalOpen(true);
  };

  // Function to close the update modal
  const closeUpdateModal = () => {
    setSelectedUpdateItem(null);
    setUpdateModalOpen(false);
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
              <SiMicrosoftexcel  alt="Descargar" className="text-white w-10 h-10" />
            </button>

            <Link to='/agregar'>
            <CgAdd alt='Agregar' className="text-white w-10 h-10" />
            </Link>

            <AiFillBell alt='Notificaciones' className="text-white w-10 h-10" />

            <BiSolidUser alt='Usuario' className="text-white w-10 h-10" />
    
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
        {currentItems.map((item) => (
            <tr key={item.Num_Referencia}>
              <td className="py-2 px-4 border-transparent">{item.Num_Referencia}</td>
              <td className="py-2 px-4 border-transparent">{item.Nombre}</td>
              <td className="py-2 px-4 border-transparent">{item.Ubicacion}</td>
              <td className="py-2 px-4 border-transparent">{item.Resguardante}</td>

              <td className="py-2 w-auto border-transparent">
              <button
                  className="bg-lime-600 text-white px-6 py-2 mr-2 rounded"
                  onClick={() => openModal(item)}
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
      <div className="flex justify-center items-center mt-4">
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
      <p>Num_Referencia: {selectedItem.Num_Referencia}</p>
      <p>Nombre: {selectedItem.Nombre}</p>
      <p>Ubicacion: {selectedItem.Ubicacion}</p>
      <p>Resguardante: {selectedItem.Resguardante}</p>
      {/* Add more details as needed */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>
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
      </div>

    </div>
    
  );
}

export default InventoryTable;
