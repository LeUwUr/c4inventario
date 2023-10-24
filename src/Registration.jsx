import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegistrationPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const comparePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    comparePasswords();

    if (!passwordError) {
      // Aquí puedes agregar tu lógica de envío de formulario
    }
  };

  return (
    <div className="container mx-auto text-sm mt-10 px-4 md:px-0">
      <h1 className="text-2xl font-bold text-amber-950 mb-4 text-center">
        Gestión de Inventarios
      </h1>
      <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center">Registrate</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white px-6 pt-6 pb-6 mb-4 mx-auto max-w-md"
      >
        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-yellow-500 text-sm mb-2">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Eva"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-yellow-500 text-sm mb-2">Apellido</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Aguirre"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-yellow-500 text-sm mb-2">Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eva.aguirre@gmail.com"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div className="mb-4 flex">
          <div className="w-1/2 mr-2">
            <label className="block text-yellow-500 text-sm mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="w-1/2 ml-2">
            <label className="block text-yellow-500 text-sm mb-2">Confirmar contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="********"
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mb-4">
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
        </div>

        <div className="mb-4">
          <Link to="/inventory">
            <button className="w-full p-2 maroon-button rounded-md hover:bg-maroon-800 focus:outline-none">
              <strong>Entrar</strong>
            </button>
          </Link>
        </div>
      </form>

      <div className="text-center">
        Ya tienes una cuenta?
        <Link to="/login" className="ml-2 text-amber-950 cursor-pointer">
          <strong>Iniciar Sesión</strong>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationPage;
