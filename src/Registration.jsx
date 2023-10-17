import React, { useState } from "react";
import { Link } from "react-router-dom";


// This is the Registration Component
const RegistrationPage = () => {
  // State hooks for input values
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle registration submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can add functionality to handle registration, e.g. API call

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Submitted:", { name, surname, email, password });
  };

  return (
    <div className="registration-container">
      <h1>Gestión de Inventarios</h1>
      <h2>Registrate</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Nombre</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Eva"
          />
        </div>

        <div className="input-group">
          <label>Apellido</label>
          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Aguirre"
          />
        </div>

        <div className="input-group">
          <label>Correo electronico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="eva.aguirre@gmail.com"
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        <div className="input-group">
          <label>Confirmar contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="********"
          />
        </div>

        <button type="submit">Entrar</button>
      </form>

      <div className="login-prompt">
        Ya tienes una cuenta?
          <Link to="/login">Iniciar Sesión</Link>
      </div>
    </div>
  );
};

export default RegistrationPage;

