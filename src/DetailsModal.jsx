import { useState } from "react";

const DetailsModal = ({ isModalOpen, selectedItem, closeModal }) => {
    const [isImageModalOpen, setImageModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    

    const openImageModal = (image) => {
        setSelectedImage(image);
        setImageModalOpen(true);
    };

    const closeImageModal = () => {
        setImageModalOpen(false);
    };


    return (
        <>
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
                                <input type="text" value={selectedItem.Num_Referencia || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
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
                                <input type="text" value={selectedItem.locacion || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
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
        </>
    );
};
export default DetailsModal;