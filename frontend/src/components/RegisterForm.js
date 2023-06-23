import React from 'react';

const RegisterForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envio do formulário de registro
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrar</h2>
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.sectionTitle}>Dados Pessoais</h3>
          <input type="text" placeholder="Nome" style={styles.input} />
          <input type="tel" placeholder="Telefone" style={styles.input} />
          <input type="text" placeholder="Endereço" style={styles.input} />
          <input type="text" placeholder="CPF" style={styles.input} />
          <input type="file" style={styles.fileInput} />
        </form>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h3 style={styles.sectionTitle}>Dados do Cartão</h3>
          <input type="text" placeholder="Nome no Cartão" style={styles.input} />
          <input type="text" placeholder="Número do Cartão" style={styles.input} />
          <input type="text" placeholder="CVC" style={styles.input} />
          <input type="email" placeholder="Email" style={styles.input} />
          <input type="password" placeholder="Senha" style={styles.input} />
        </form>
      </div>
      <button type="submit" style={styles.registerButton}>
        Cadastrar
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '600px',
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
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '45%',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  fileInput: {
    marginBottom: '10px',
  },
  registerButton: {
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

export default RegisterForm;
