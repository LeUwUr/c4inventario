import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-96 p-8 bg-white shadow-md rounded-lg">
        <div className="flex justify-center">
          {/* Logo */}
          <img
            src="c4logo.jpg"
            alt="C4 Logo"
            className="w-30 h-24 mb-4"
          />
        </div>

        <h1 className="text-2xl font-bold text-amber-950 mb-4 text-center">
          Gestión de Inventarios
        </h1>
        <h2 className="text-xl font-bold text-yellow-500 mb-4 text-center">Inicio de Sesión</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-yellow-500 text-sm mb-2" htmlFor="email">
            Correo electrónico
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="email"
            id="email"
            placeholder="example@mail.com"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            className="block text-yellow-500 text-sm mb-2"
            htmlFor="password"
          >
            Contraseña
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="password"
            id="password"
            placeholder="********"
          />
        </div>

        {/* Login Button */}
        <div className="mb-4">
          <Link to ="/inventory">
        <button className="w-full p-2 maroon-button rounded-md hover:bg-maroon-800 focus:outline-none">
            <strong>Entrar</strong>
          </button>
          </Link>
        </div>

        {/* Google Login Button */}
        <div className="mb-4">
          <button className="w-full p-2 orange-button rounded-md hover:bg-yellow-600 focus:outline-none">
            <img
              src="google-logo.png"
              alt="Google Icon"
              className="w-6 h-6 inline-block mr-2"
            />
            <strong>Iniciar con Google</strong>
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm">
            No tienes una cuenta?{" "}
            <span className="text-amber-950 cursor-pointer">
              <Link to="/registration"><strong>Registrate</strong></Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

