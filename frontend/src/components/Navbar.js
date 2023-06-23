import React from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;

  const shouldShowButtons = !(pathname === '/cadastro' || pathname === '/login');

  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Menu</h1>
      {shouldShowButtons && (
        <div style={styles.buttonContainer}>
          <button style={styles.button}>Logar</button>
          <button style={styles.button}>Carrinho</button>
          <button style={styles.button}>Cadastrar</button>
        </div>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: '10px 20px',
  },
  title: {
    fontSize: '29px',
  },
  buttonContainer: {
    display: 'flex',
  },
  button: {
    marginLeft: '30px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#ccc',
    border: 'none',
    cursor: 'pointer',
    color: 'black',
    fontWeight: 'bold',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar;
