import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const navigate = useNavigate(); //obtener el objeto history

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [missingFields, setMissingFields] = useState([]);

  const comparePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  const showSuccessNotification = () => {
    window.alert("Registro completado exitosamente");
  };

  const validatePassword = () => {
    // Verificar que la contraseña contenga al menos una mayúscula y un número
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/;
    return passwordRegex.test(password);
  };

  const validateEmail = () => {
    // Verificar que el correo electrónico tenga un formato válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    comparePasswords();

    // Verificar que todos los campos estén llenos
    if (!name || !lastname || !email || !password || !confirmPassword) {
      window.alert("Todos los campos son obligatorios");
      return;
    }

    // Validar el formato del correo electrónico
    if (!validateEmail()) {
      window.alert("El formato del correo electrónico no es válido");
      return;
    }

    // Validar la contraseña
    if (!validatePassword()) {
      window.alert("La contraseña debe contener al menos una mayúscula y un número");
      return;
    }

    if (!passwordError) {
      try {
        const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            lastname,
            email,
            password,
          }),
        });

        if (response.ok) {
          console.log('Usuario registrado exitosamente');
          showSuccessNotification();
          // Redirigir a la pagina login
          navigate('/login');
        } else {
          // Handle non-ok response
          const errorData = await response.json();
          console.error('Error al registrar el usuario:', errorData);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="container mx-auto text-sm mt-10 px-4 md:px-0">
        <form
          onSubmit={handleSubmit}
          className="bg-white px-6 pt-6 pb-6 mb-4 mx-auto max-w-md rounded-lg"
        >
          <div className="text-2xl font-bold text-amber-950 mb-4 text-center">
            Gestión de Inventarios
          </div>
          <div className="text-xl font-bold text-yellow-500 mb-4 text-center">Registrate</div>

          <div className="mb-4 flex">
            <div className="w-1/2 mr-2">
              <label className="block text-yellow-500 text-sm mb-2">Nombre</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John"
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="w-1/2 ml-2">
              <label className="block text-yellow-500 text-sm mb-2">Apellido</label>
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="Doe"
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
              placeholder="john.doe@gmail.com"
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
            <button className="w-full p-2 maroon-button rounded-md hover:bg-maroon-800 focus:outline-none"
              onClick={handleSubmit}>
              <strong>Confirmar</strong>
            </button>
          </div>

          <div className="text-center">
            Ya tienes una cuenta?
            <Link to="/login" className="ml-2 text-amber-950 cursor-pointer">
              <strong>Iniciar Sesión</strong>
            </Link>
          </div>

        </form>
      </div>
    </div>
  );
};
export default RegistrationPage;
