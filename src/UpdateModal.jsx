import { useState } from "react";

const UpdateModal = ({ updateDetails, isUpdateModalOpen, selectedUpdateItem, ubicaciones, municipios, closeUpdateModal, handleUpdate }) => {

    const [motivo, setMotivo] = useState('');
    const [ubicacionMunicipioChanged, setUbicacionMunicipioChanged] = useState(false);
    const [selectedUbicacion, setSelectedUbicacion] = useState('');
    const [selectedMunicipio, setSelectedMunicipio] = useState('');

    return (
        <>
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
                                <input type="text" value={updateDetails.Num_Referencia || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                                <p><strong>Serial:</strong></p>
                                <input type="text" value={updateDetails.Serial || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
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
                                <input type="text" value={updateDetails.Descripcion || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                            </div>
                        </div>

                        <div className="mt-2 pl-8 pr-8 flex">

                            {/* Estado */}
                            <div className="w-1/3 pr-4">
                                <p><strong>Estado:</strong></p>
                                <input type="text" value={updateDetails.Estado || 'Desconocido'} readOnly className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2" />
                            </div>

                            {/* Ubicación */}
                            <div className="w-1/3 pr-4">
                                <p><strong>Ubicación:</strong></p>
                                <select
                                    value={updateDetails.Ubicacion || 'Desconocido'}
                                    onChange={(e) => {
                                        setSelectedUbicacion(e.target.value);
                                        setUbicacionMunicipioChanged(true);
                                        setMotivo('');
                                    }}
                                    className="w-full border rounded-md border-gray-400 mb-2 px-3 py-2"
                                >
                                    <option value="" disabled>Seleccione una ubicación</option>
                                    {ubicaciones.map((ubicacion, index) => (
                                        <option key={index} value={ubicacion.Lugar}>
                                            {ubicacion.Lugar}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Municipio */}
                            <div className="w-1/3 pl-4">
                                <p><strong>Municipio:</strong></p>
                                <select
                                    value={updateDetails.municipio || 'Desconocido'}
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
                        <button className="absolute bottom-4 right-16 bg-amber-950 text-white px-6 py-2 rounded" onClick={handleUpdate}>
                            Actualizar
                        </button>
                        <button
                            className="absolute bottom-4 right-48 bg-amber-500 text-white px-6 py-2  mr-8 rounded"
                            onClick={closeUpdateModal}
                        >
                            Cancelar
                        </button>

                    </div>
                </div>
            )}
        </>
    )
};
export default UpdateModal;