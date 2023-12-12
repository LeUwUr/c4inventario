import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { AiFillBell } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { CgAdd } from 'react-icons/cg';
import { RxExit } from 'react-icons/rx';
import { SiMicrosoftexcel } from 'react-icons/si';
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
  const [ubicaciones, setUbicaciones] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [image, setImage] = useState([]);

  // Function to handle logout using the useNavigate hook
  const navigate = useNavigate();
  const { userData } = useLoginContext();

  const [updateDetails, setUpdateDetails] = useState({
    Num_Referencia: '',
    NSerial: '',
    Nombre: '',
    Marca: '',
    Modelo: '',
    Resguardante: '',
    Ubicacion: '',
    Municipio: '',
    Estado: '',
    FechaCreacion: '',
    Descripcion: '',
    // Otros campos necesarios
  });

  const [selectedUbicacion, setSelectedUbicacion] = useState(updateDetails.Ubicacion || ''); // Valor inicial basado en los detalles actuales
  const [selectedMunicipio, setSelectedMunicipio] = useState(updateDetails.Municipio || ''); // Valor inicial basado en los detalles actuales
  const [selectedMotivo, setSelectedMotivo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [ubicacionMunicipioChanged, setUbicacionMunicipioChanged] = useState(false);


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
    fetch('http://localhost:8080/api/ubicaciones')
      .then((response) => response.json())
      .then((data) => setUbicaciones(data))
      .catch((error) => console.error(error));

    // Obtener municipios
    fetch('http://localhost:8080/api/municipios')
      .then((response) => response.json())
      .then((data) => setMunicipios(data))
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

  const downloadExcel = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/downloadArtDetailsExcel', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        },
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'articulo_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error);
    }
  };



  // const downloadExcel = () => {
  //   const worksheet = XLSX.utils.json_to_sheet(filteredData);
  //   const workbook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workbook, worksheet, 'Articulo');
  //   XLSX.writeFile(workbook, 'articulo_data.xlsx');
  // };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getArtByID/${productId}`);
      const data = await response.json();

      if (data.status === 'SUCCESS') {
        console.log('Detalles del producto:', data.data);
        const imageUrls = data.data.images.map(image => `http://localhost:8080/images/${image}`);
        console.log('Rutas de imágenes corregidas:', imageUrls);
        setSelectedItem({
          ...selectedItem,
          images: imageUrls,
        });


        openModal(data.data);
      } else {
        console.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  const openUpdateModal = async (item) => {
    try {
      const response = await fetch(`http://localhost:8080/api/getArtByID/${item.Num_Referencia}`);
      const data = await response.json();

      if (data.status === 'SUCCESS') {
        setUpdateDetails(data.data);
        setSelectedUpdateItem(item);
        setUpdateModalOpen(true);
      } else {
        console.error('Failed to fetch product details');
      }
    } catch (error) {
      console.error('Error fetching product details', error);
    }
  };

  useEffect(() => {
    // Obtener ubicaciones
    fetch('http://localhost:8080/api/ubicaciones')
      .then((response) => response.json())
      .then((data) => setUbicaciones(data))
      .catch((error) => console.error(error));

    // Obtener municipios
    fetch('http://localhost:8080/api/municipios')
      .then((response) => response.json())
      .then((data) => setMunicipios(data))
      .catch((error) => console.error(error));
  }, []);

  const openModal = async (productDetails) => {
    try {
      console.log('Selected Item:', productDetails);

      const imageUrls = productDetails.images.map(image => ({
        name: image,  // Store both name and URL
        url: `http://localhost:8080/Images/${image}`,
      }));

      setSelectedItem({
        ...productDetails,
        images: imageUrls,
      });

      setModalOpen(true);
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  };



  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setUbicacionMunicipioChanged(false);
    setMotivo('');
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

  const renderColumnFields = (fields) => {
    return fields.map((field) => (
      <div key={field} className="mb-2">
        <p className="font-bold">{field}:</p>
        <input
          type="text"
          value={updateDetails[field] || 'Desconocido'}
          readOnly
          className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2"
        />
      </div>
    ));
  };

  const MAX_VISIBLE_PAGES = 10;

  // Calcular el índice de inicio y fin para la página actual
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  // Obtener los elementos de la página actual
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Calculate total number of pages
  const totalPages = Math.ceil(inventoryData.length / itemsPerPage) || 1;

  return (
    <div className="w-full">
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

      <h1 className="text-3xl font-bold text-red-900 mt-10 mb-5 text-center">
        Inventario
      </h1>
      <div className="relative">
        <table className="mx-auto w-10/12 text-center bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border text-white bg-amber-500">NÚMERO DE INVENTARIO</th>
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
                <td className="py-2 w-auto border-transparent relative">
                  <div className="options-container">
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
                    <button
                      className="bg-red-800 text-white px-8 py-2 rounded"
                    >
                      Baja
                    </button>{" "}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Numeric pagination */}
      <div className="flex justify-center items-center mt-20">
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
          <div className="fixed inset-0 flex items-center justify-center overflow-y-auto">
            {/* Background overlay */}
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={closeModal}></div>
            {/* Modal content */}
            <div className="bg-white border border-gray-300 rounded-md h-4/5 w-4/6 p-6 relative z-10">
              {/* Content for the modal */}
              <h2 className="text-2xl text-center font-bold mt-2 mb-4">Detalles del Artículo</h2>

              <div className="flex">
                {/* Primera columna */}
                <div className="w-1/2 pl-8 pr-8">
                  <p><strong>Número de inventario:</strong></p>
                  <input type="text" value={selectedItem.id || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Serial:</strong></p>
                  <input type="text" value={selectedItem.NSerial || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Nombre:</strong></p>
                  <input type="text" value={selectedItem.Nombre || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Marca:</strong></p>
                  <input type="text" value={selectedItem.Marca || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Modelo:</strong></p>
                  <input type="text" value={selectedItem.Modelo || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                </div>

                {/* Segunda columna */}
                <div className="w-1/2 pl-8 pr-8">
                  <p><strong>Resguardante</strong></p>
                  <input type="text" value={selectedItem.Resguardante || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Ubicación:</strong></p>
                  <input type="text" value={selectedItem.location || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Municipio:</strong></p>
                  <input type="text" value={selectedItem.Municipio || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Estado:</strong></p>
                  <input type="text" value={selectedItem.estado || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Fecha de creación:</strong></p>
                  <input type="text" value={selectedItem.FechaCreacion || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                </div>

              </div>

              {/* Descripción y Fecha de creación en otra div */}
              <div className="mt-4 pl-8 pr-8">
                <div>
                  <p><strong>Descripción:</strong></p>
                  <input type="text" value={selectedItem.Descripcion || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                </div>
              </div>

              {/* Agregar seccion para mostrar las imagenes*/}
              {selectedItem.images && selectedItem.images.length > 0 ? (
                <div className="mt-4">
                  <p><strong>Imágenes:</strong></p>
                  <div className="flex flex-col">
                    {selectedItem.images.map((image, index) => (
                      <p
                        key={index}
                        className="cursor-pointer text-amber-900 underline mb-2"
                        onClick={() => openImageModal(image.url)}  // Open modal with URL
                      >
                        {image.name}  {/* Display the name */}
                      </p>
                    ))}
                  </div>
                </div>
              ) : (
                <p>Sin imágenes disponibles</p>
              )}
              {/* Botón "Cerrar" posicionado en la esquina inferior derecha */}
              <button className="absolute bottom-8 right-16 bg-amber-950 text-white px-6 py-2 rounded" onClick={closeModal}>
                Cerrar
              </button>
            </div>
          </div>
        )}

        {/* Modal de imagen */}
        {isImageModalOpen && selectedImage && (
          <div className="fixed inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-50 absolute inset-0" onClick={closeImageModal}></div>
            <div className="bg-white border border-gray-300 rounded-md p-6 relative z-10 max-w-screen-lg flex flex-col items-center">
              <img src={selectedImage} alt="Imagen ampliada" className="max-w-full max-h-screen object-contain" />
              <button className="mt-4 bg-amber-500 text-white px-4 py-2 rounded" onClick={closeImageModal}>
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
            <div className="bg-white border border-gray-300 rounded-md h-4/5 w-4/6 p-6 relative z-10">
              {/* Content for the modal */}
              <h2 className="text-2xl text-center font-bold mt-2 mb-4">Actualizar Artículo</h2>
              <div className="flex">
                {/* Primera columna */}
                <div className="w-1/2 pl-8 pr-8">
                  <p><strong>Número de inventario:</strong></p>
                  <input type="text" value={updateDetails.id || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Serial:</strong></p>
                  <input type="text" value={updateDetails.NSerial || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Nombre:</strong></p>
                  <input type="text" value={updateDetails.Nombre || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Marca:</strong></p>
                  <input type="text" value={updateDetails.Marca || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />

                </div>
                {/*Segunda columna*/}
                <div className="w-1/2 pl-8 pr-8">
                  <p><strong>Modelo:</strong></p>
                  <input type="text" value={updateDetails.Modelo || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Resguardante:</strong></p>
                  <input type="text" value={updateDetails.Resguardante || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                  <p><strong>Fecha de Creación:</strong></p>
                  <input type="text" value={updateDetails.FechaCreacion || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />

                </div>
              </div>
              {/* Descripción y Fecha de creación en otra div */}
              <div className="mt-2 pl-8 pr-8">
                <div>
                  <p><strong>Descripción:</strong></p>
                  <input type="text" value={updateDetails.Descripcion} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                </div>
              </div>

              <div className="mt-2 pl-8 pr-8 flex">

                {/* Estado */}
                <div className="w-1/3 pr-4">
                  <p><strong>Estado:</strong></p>
                  <input type="text" value={updateDetails.estado || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                </div>

                {/* Ubicación */}
                <div className="w-1/3 pr-4">
                  <p><strong>Ubicación:</strong></p>
                  <select
                    value={selectedUbicacion}
                    onChange={(e) => {
                      setSelectedUbicacion(e.target.value);
                      setUbicacionMunicipioChanged(true);
                      setMotivo('');
                    }}
                    className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2"
                  >
                    <option value="" disabled>Seleccione una ubicación</option>
                    {ubicaciones.map((ubicacion, index) => (
                      <option key={index} value={ubicacion.Lugar}
                        defaultValue={ubicacion.Lugar === updateDetails.ubicacion}
                      >
                        {ubicacion.Lugar}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Municipio */}
                <div className="w-1/3 pl-4">
                  <p><strong>Municipio:</strong></p>
                  <select
                    value={selectedMunicipio}
                    onChange={(e) => {
                      setSelectedMunicipio(e.target.value);
                      setUbicacionMunicipioChanged(true);
                      setMotivo('');
                    }}
                    className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2"
                  >
                    <option value="" disabled>Seleccione un municipio</option>
                    {municipios.map((municipio, index) => (
                      <option key={index} value={municipio.Nombre}>
                        {municipio.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-2 pl-8 pr-8">
                {/* Mostrar el input de motivo solo si la ubicación o el municipio cambió */}
                {ubicacionMunicipioChanged && (
                  <div>
                    <p><strong>Motivo:</strong></p>
                    <input
                      type="text"
                      value={motivo}
                      onChange={(e) => setMotivo(e.target.value)}
                      className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2"
                    />
                  </div>
                )}
              </div>
              <button className="absolute bottom-4 right-16 bg-amber-950 text-white px-6 py-2 rounded" onClick={closeUpdateModal}>
                Actualizar
              </button>
            </div>
          </div>
        )}

        {/* Ventana emergente con la información del usuario */}
        {isUserInfoModalOpen && (
          <div className="fixed top-16 right-25 w-5/6 flex flex-col items-end">
            {/* Background overlay */}
            <div className="fixed inset-0" onClick={closeUserInfoModal}></div>
            <div className="bg-white p-4 rounded-md shadow-lg shadow-black text-center">
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
        {Array.from({ length: Math.min(totalPages, MAX_VISIBLE_PAGES) }, (_, index) => index + 1).map((page) => (
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

    </div >

  );
}

export default InventoryTable;