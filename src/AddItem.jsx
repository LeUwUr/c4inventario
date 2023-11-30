import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from './LoginContext';
import Navbar from "./Navbar";

import { IoIosAdd } from "react-icons/io";
import { MdDelete, MdOutlineAddPhotoAlternate } from "react-icons/md";

const MAX_FILE_SIZE_MB = 5; // Tamaño máximo permitido en megabytes

const AddItem = () => {
    const navigate = useNavigate();
    const { userData, setUserData } = useLoginContext();
    const [numImages, setNumImages] = useState(1);

    const [formData, setFormData] = useState({
        codigo: "",
        serial: "",
        nombre: "",
        modelo: "",
        descripcion: "",
        marca: "",
        ubicacion: "",
        municipio: "",
        email: "",
        resguardante: "",
        imagenes: []
    });
    const [marcas, setMarcas] = useState([]);
    const [ubicaciones, setUbicaciones] = useState([]);
    const [municipio, setMunicipios] = useState([]);
    const [resguardante, setResguardante] = useState("");


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserData(userData);
        }

        // Cargar marcas, ubicaciones y municipios al montar el componente
        fetch("http://localhost:8080/api/marcas")
            .then((response) => response.json())
            .then((data) => {
                setMarcas(data);
            })
            .catch((error) => console.error("Error al obtener marcas:", error));

        fetch("http://localhost:8080/api/ubicaciones")
            .then((response) => response.json())
            .then((data) => {
                setUbicaciones(data);
            })
            .catch((error) => console.error("Error al obtener ubicaciones:", error));

        fetch("http://localhost:8080/api/municipios")
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setMunicipios(data);
            })
            .catch((error) => console.error("Error al obtener municipios.", error));
    }, [setUserData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            if (name === "resguardante") {
                const updatedResguardante = `${userData.firstName} ${userData.lastName}`;
                return {
                    ...prevData,
                    prevData: updatedResguardante,
                };
            } else {
                return {
                    ...prevData,
                    [name]: value,
                };
            }
        });
    };



    const handleImageChange = (e, index) => {
        const files = e.target.files;

        // Validar que se haya seleccionado un archivo
        if (files.length === 0) {
            return;
        }

        // Validar que el archivo sea una imagen
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(files[0].type)) {
            alert("Solo se permiten archivos de imagen (JPEG, PNG, GIF).");
            return;
        }

        // Validar el tamaño del archivo
        const fileSizeInMB = files[0].size / (1024 * 1024);
        if (fileSizeInMB > MAX_FILE_SIZE_MB) {
            alert(`El tamaño del archivo no debe exceder los ${MAX_FILE_SIZE_MB} MB.`);
            return;
        }

        const newImages = [...formData.imagenes];
        newImages[index] = files[0];
        setFormData({
            ...formData,
            imagenes: newImages
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append("codigo", formData.codigo);
        form.append("serial", formData.serial);
        form.append("nombre", formData.nombre);
        form.append("modelo", formData.modelo);
        form.append("descripcion", formData.descripcion);
        form.append("marca", formData.marca);
        form.append("ubicacion", formData.ubicacion);
        form.append("municipio", formData.municipio);
        form.append("email", formData.email);
        // Use user data directly here
        form.append("resguardante", `${userData.firstName} ${userData.lastName}`);

        // Agregar imágenes al formulario
        for (let i = 0; i < formData.imagenes.length; i++) {
            form.append("images", formData.imagenes[i]);
        }

        console.log("FormData:", formData);

        if (!formData.codigo) {
            alert('Please enter a codigo before submitting.');
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/addItem", {
                method: "POST",
                body: form
            });

            if (!response.ok) {
                console.error("Respuesta del servidor:", await response.json());
            } else {
                // Mostrar una ventana/modal o mensaje al usuario de que se ha agregado correctamente
                alert("Elemento agregado correctamente");

                // Redirigir al usuario a la página /Table
                navigate("/inventory");
            }
        } catch (error) {
            console.error("Error al enviar la petición:", error);
        }

    };

    const addImageField = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            imagenes: [...prevFormData.imagenes, null]
        }));
        setNumImages(numImages + 1);
    };

    const removeImageField = (index) => {
        const updatedImages = formData.imagenes.filter((_, i) => i !== index);
        setFormData({
            ...formData,
            imagenes: updatedImages
        });
        setNumImages(numImages - 1);
    };

    const handleAddLocation = async () => {
        const newLocation = prompt("Ingrese una nueva ubicación:");
        if (newLocation) {
            try {
                const response = await fetch("http://localhost:8080/api/setLocation", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ location: newLocation }),
                });
                // Manejar la respuesta del servidor según tus necesidades
                console.log(response);
                // Actualizar la lista de ubicaciones
                fetch("http://localhost:8080/api/ubicaciones")
                    .then((response) => response.json())
                    .then((data) => setUbicaciones(data))
                    .catch((error) =>
                        console.error("Error al obtener ubicaciones:", error)
                    );
            } catch (error) {
                console.error("Error al enviar la petición:", error);
            }
        }
    };

    const handleAddBrand = async () => {
        const newBrand = prompt("Ingrese una nueva marca:");
        if (newBrand) {
            try {
                const response = await fetch("http://localhost:8080/api/setBrand", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ brand: newBrand }),
                });
                // Manejar la respuesta del servidor según tus necesidades
                console.log(response);
                // Actualizar la lista de marcas
                fetch("http://localhost:8080/api/marcas")
                    .then((response) => response.json())
                    .then((data) => setMarcas(data))
                    .catch((error) =>
                        console.error("Error al obtener marcas:", error)
                    );
            } catch (error) {
                console.error("Error al enviar la petición:", error);
            }
        }
    };

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData));
    }, [userData]);


    return (

        <div className="w-full py-0 max-w-3xl">
            <Navbar>
                <h1 className="text-2xl mb-1 text-center font-bold text-white">Agregar</h1>
            </Navbar>
            <div className="flex  place-content-center items-center w-screen ">
                <div className="grid grid-cols-3 gap-4 items-center">
                    <div>
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>UPC</strong>
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md"
                            type="text"
                            placeholder="1921501226"
                            name="codigo"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>Número Serial</strong>
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md"
                            type="text"
                            placeholder="123456789"
                            name="serial"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>Nombre</strong>
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md"
                            type="text"
                            placeholder="Lampara de metal"
                            name="nombre"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>Modelo</strong>
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md"
                            type="text"
                            placeholder="342201"
                            name="modelo"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-3">
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>Descripción</strong>
                        </label>
                        <input
                            className="w-full px-3 py-2 border rounded-md"
                            type="text"
                            placeholder="Lampara de mesa con cable a corriente de luz"
                            name="descripcion"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="flex-grow">
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                <strong>Marca</strong>
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded-md text-black"
                                name="marca"
                                onChange={handleInputChange}
                            >
                                <option key="default" value="">Seleccionar marca</option>
                                {marcas.map((marca) => (
                                    <option key={marca.id} value={marca.id}>
                                        {marca.Nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAddBrand}
                            className="p-2 bg-white mt-6 "
                        >
                            <IoIosAdd size={38} color="#333" />
                        </button>
                    </div>

                    <div className="flex items-center space-x-2">
                        <div className="flex-grow">
                            <label className="block text-xl font-medium text-gray-700 mb-2">
                                <strong>Ubicación</strong>
                            </label>
                            <select
                                className="w-full px-3 py-2 border rounded-md text-black"
                                name="ubicacion"
                                onChange={handleInputChange}
                            >
                                <option key="default" value="">Seleccionar ubicación</option>
                                {ubicaciones.map((ubicacion) => (
                                    <option key={ubicacion.id} value={ubicacion.id}>
                                        {ubicacion.Lugar}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={handleAddLocation}
                            className="p-2 bg-white mt-6"
                        >
                            <IoIosAdd size={38} color="#333" />
                        </button>
                    </div>

                    <div className="col-span-2">
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>Municipio</strong>
                        </label>
                        <select
                            className="w-full px-3 py-2 border rounded-md text-black bg-white"
                            name="municipio"
                            onChange={handleInputChange}
                        >
                            <option key="default" value="">Seleccionar municipio</option>
                            {municipio.map((municipio) => (
                                <option key={municipio.id} value={municipio.id}>
                                    {municipio.Nombre}
                                </option>
                            ))}
                        </select>
                        <div>
                            <div className="col-span-2">
                                <label className="block text-xl font-medium text-gray-700 mb-2">
                                    <strong>Resguardante</strong>
                                </label>
                                <input
                                    className="w-full px-3 py-2 border rounded-md"
                                    type="text"
                                    placeholder={`${userData.firstName} ${userData.lastName}`}
                                    name="resguardante"
                                    value={formData.resguardante}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">
                        <label className="block text-xl font-medium text-gray-700 mb-2">
                            <strong>Fotos</strong>
                        </label>
                        <div>
                            {[...Array(numImages)].map((_, index) => (
                                <div key={index} className="flex items-center mb-2">
                                    <input
                                        type="file"
                                        onChange={(e) => handleImageChange(e, index)}
                                        className="w-full px-3 py-2 border rounded-md mr-2"
                                        accept="image/*"
                                    />
                                    {index < numImages - 1 && (
                                        <label
                                            onClick={() => removeImageField(index)}
                                            className="cursor-pointer ml-2"
                                        >
                                            <MdDelete size={38} color="#ff0000" />
                                        </label>
                                    )}
                                    {index === numImages - 1 && index < 4 && (
                                        <label onClick={addImageField} className="cursor-pointer ml-2">
                                            <MdOutlineAddPhotoAlternate size={38} color="#333" />
                                        </label>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-3 text-right">
                        <button style={{ width: "32%" }} className="px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                            onClick={handleSubmit}>
                            Agregar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddItem;