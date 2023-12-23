import React from 'react';
import ReactDOM from 'react-dom';

const CustomAlert = ({ message, type, onClose}) => {
  const getBackgroundColor = (type) => {
    switch (type) {
      case 'alert':
        return 'purple';
      case 'success':
        return 'green';
      case 'error':
        return 'red';
      case 'info':
      default:
        return 'Maroon'; // Puedes cambiar el color por defecto o agregar más casos según sea necesario
    }
  };

  const alertContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px', // Ajusta el ancho según tus necesidades
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    backgroundColor: getBackgroundColor(type),
    color: 'white',
    fontWeight: 'bold',
    zIndex: 9999,
  };

  const messageStyle = {
    fontSize: '32px', // Ajusta el tamaño de la letra según tus necesidades
  };

  const closeButtonStyle = {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid #ccc',
    padding: '10px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '40px',
  };

  return (
    <div style={alertContainerStyle}>
      <p style={messageStyle}>{message}</p>
      <button onClick={onClose} style={closeButtonStyle}>
        Cerrar
      </button>
    </div>
  );
};

const showAlert = (message, type = 'info', duration = 5000000) => {
  const rectangleContainer = document.createElement('div');
  document.body.appendChild(rectangleContainer);

  const closeAlert = () => {
    ReactDOM.unmountComponentAtNode(rectangleContainer);
    rectangleContainer.remove();
  };

  const rectangleContainerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9998,
  };

  ReactDOM.render(
    <div style={rectangleContainerStyle}>
      <CustomAlert message={message} type={type} onClose={closeAlert} />
    </div>,
    rectangleContainer
  );

  if (duration > 0) {
    setTimeout(closeAlert, duration);
  }
};

export default showAlert;
