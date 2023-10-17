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
            className="w-24 h-24 mb-4"
          />
        </div>

        <h1 className="text-2xl font-semibold mb-4 text-center">
          Gestión de Inventarios
        </h1>
        <h2 className="text-xl mb-4 text-center">Inicio de Sesión</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
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
            className="block text-gray-700 text-sm mb-2"
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
          <button className="w-full p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 focus:outline-none">
            Entrar
          </button>
        </div>

        {/* Google Login Button */}
        <div className="mb-4">
          <button className="w-full p-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none">
            <img
              src="path_to_google_icon.png"
              alt="Google Icon"
              className="w-6 h-6 inline-block mr-2"
            />
            Iniciar con Google
          </button>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-sm">
            No tienes una cuenta?{" "}
            <span className="text-purple-500 cursor-pointer">
              <Link to="/registration">Registrate</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

