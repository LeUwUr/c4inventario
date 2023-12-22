
const UserInfoModal = ({ userData, isUserInfoModalOpen, closeUserInfoModal }) => {

    return (
        <>
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
        </>
    )
}
export default UserInfoModal;