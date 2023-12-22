import React, { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import DetailsModal from "./DetailsModal";
import UpdateModal from "./UpdateModal";
import UserInfoModal from "./UserInfoModal";

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

  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedUpdateItem, setSelectedUpdateItem] = useState(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [isUserInfoModalOpen, setUserInfoModalOpen] = useState(false);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [selectedUbicacion, setSelectedUbicacion] = useState('');
  const [selectedMunicipio, setSelectedMunicipio] = useState('');
  const [selectedMotivo, setSelectedMotivo] = useState('');
  const [motivo, setMotivo] = useState('');
  const [ubicacionMunicipioChanged, setUbicacionMunicipioChanged] = useState(false);
  const [updateDetails, setUpdateDetails] = useState({
    Num_Referencia: '',
    NSerial: '',
    Nombre: '',
    Marca: '',
    Modelo: '',
    Resguardante: '',
    Ubicacion: '',
    Municipio: '',
    estado: '',
    FechaCreacion: '',
    Descripcion: '',
    // Otros campos necesarios
  });

  // Function to handle logout using the useNavigate hook
  const navigate = useNavigate();
  const { userData } = useLoginContext();

  const itemsPerPage = 10;

  const handleUpdate = async () => {
    try {
      // Construct the updated details object
      const updatedDetails = {
        ...updateDetails,
        Ubicacion: selectedUbicacion,
        Municipio: selectedMunicipio,
        // Add other fields as needed based on your form
      };
      // Update the article details using the API endpoint
      const response = await fetch('http://localhost:8080/api/updItem', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedDetails),
      });

      const data = await response.json();

      if (data.status === 'SUCCESS') {
        // Handle success, maybe close the modal or show a success message
        console.log('Article updated successfully');
        closeUpdateModal();
      } else {
        // Handle failure, maybe show an error message
        console.error('Failed to update article:', data.error);
      }
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  // useEffect(() => {
  //   if (selectedUpdateItem) {
  //     setUpdateDetails({
  //       ...selectedUpdateItem,
  //       Resguardante: selectedUpdateItem.Resguardante,
  //       Ubicacion: selectedUpdateItem.Ubicacion,
  //       Marca: selectedUpdateItem.Marca,
  //       Modelo: selectedUpdateItem.Modelo,
  //       FechaCreacion: selectedUpdateItem.FechaCreacion,
  //       Descripcion: selectedUpdateItem.Descripcion,
  //       // Agrega otros campos según sea necesario
  //     });
  //   }
  // }, [selectedUpdateItem]);

  useEffect(() => {
    // Set initial values based on updateDetails
    setSelectedUbicacion(updateDetails.Ubicacion || '');
    setSelectedMunicipio(updateDetails.Municipio || '');
  }, [updateDetails]);

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

      console.log('API Response:', data);

      if (data.status === 'SUCCESS') {
        const updatedDetails = {
          Num_Referencia: data.data.Num_Referencia || 'Desconocido',
          Serial: data.data.NSerial || 'Desconocido',
          Nombre: data.data.Nombre || 'Desconocido',
          Marca: data.data.Marca || 'Desconocido',
          Modelo: data.data.Modelo || 'Desconocido',
          Resguardante: data.data.Resguardante || 'Desconocido',
          Ubicacion: data.data.locacion || 'Desconocido',
          Municipio: data.data.Municipio || 'Desconocido',
          Estado: data.data.estado || 'Desconocido',
          FechaCreacion: data.data.FechaCreacion || 'Desconocido',
          Descripcion: data.data.Descripcion || 'Desconocido',
          // Agrega otros campos según sea necesario
        };

        setUpdateDetails(updatedDetails);

        setSelectedUbicacion(data.data.Ubicacion);
        setSelectedMunicipio(data.data.Municipio);

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
                      onClick={() => fetchProductDetails(item.Num_Referencia)}>
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

        <DetailsModal isModalOpen={isModalOpen} selectedItem={selectedItem} closeModal={closeModal} />

        <UpdateModal isUpdateModalOpen={isUpdateModalOpen} updateDetails={updateDetails}
          selectedUpdateItem={selectedUpdateItem} ubicaciones={ubicaciones}
          municipios={municipios} selectedMunicipio={selectedMunicipio}
          selectedUbicacion={selectedUbicacion} motivo={motivo}
          closeUpdateModal={closeUpdateModal}
          handleUpdate={handleUpdate} />

        <UserInfoModal userData={userData} isUserInfoModalOpen={isUserInfoModalOpen}
          closeUserInfoModal={closeUserInfoModal} />

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