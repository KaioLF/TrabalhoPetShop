import React from 'react';

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envio do formulário de login
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="email" placeholder="Email" style={styles.input} />
        <input type="password" placeholder="Senha" style={styles.input} />
        <div style={styles.actions}>
          <a href="/cadastro" style={styles.signupLink}>
            Não possui uma conta? Cadastre-se
          </a>
          <button type="submit" style={styles.loginButton}>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  signupLink: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#999',
    textDecoration: 'none',
  },
  loginButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default LoginForm;
