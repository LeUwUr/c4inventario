import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginContext } from './LoginContext';


function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userData, setUserData } = useLoginContext();
  const navigate = useNavigate();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que ambos campos estén llenos
    if (!email || !password) {
      window.alert("Por favor, complete ambos campos.");
      return;
    }

    let data;

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Response Data:", data);

      if (response.status === 200) {
        setUserData({
          firstName: data.data.name,
          lastName: data.data.lastName,
          email: data.data.email,
        });
        navigate("/inventory");
      } else {
        console.log("Login failed!");
        window.alert("Contraseña incorrecta. Por favor, inténtelo de nuevo.");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <form onSubmit={handleSubmit}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <div className="relative">
              <input
                className="w-full p-2 border rounded-md"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                placeholder="********"
              />
              <span
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <img
                    src="view.png"
                    alt="Mostrar Contraseña"
                    width="20"
                    height="20"
                  />
                ) : (
                  <img
                    src="hide.png"
                    alt="Ocultar Contraseña"
                    width="20"
                    height="20"
                  />
                )}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <button type="submit" className="w-full p-2 maroon-button rounded-md hover:bg-maroon-800 focus:outline-none">
              <strong>Entrar</strong>
            </button>
          </div>


          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm">
              No tienes una cuenta?{" "}
              <span className="text-amber-950 cursor-pointer">
                <Link to="/registration">
                  <strong>Registrate</strong>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;


