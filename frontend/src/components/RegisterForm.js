import React, { useState } from 'react';
import Title from '../components/Title';

const RegisterForm = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cpf, setCpf] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [numeroCartao, setNumeroCartao] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');

  const handleNomeChange = (event) => {
    setNome(event.target.value);
  };

  const handleTelefoneChange = (event) => {
    setTelefone(event.target.value);
  };

  const handleEnderecoChange = (event) => {
    setEndereco(event.target.value);
  };

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleNomeCartaoChange = (event) => {
    setNomeCartao(event.target.value);
  };

  const handleNumeroCartaoChange = (event) => {
    setNumeroCartao(event.target.value);
  };

  const handleCvvChange = (event) => {
    setCvv(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSenhaChange = (event) => {
    setSenha(event.target.value);
  };

  const handleConfirmaSenhaChange = (event) => {
    setConfirmaSenha(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUser = {
      name: nome,
      phone: telefone,
      address: endereco,
      cpf: cpf,
      creditCard: {
        name: nomeCartao,
        number: numeroCartao,
        cvv: cvv,
      },
      email: email,
      password: senha,
      confirmpassword: confirmaSenha,
    };

    // Envie os dados do novo usuário para o backend usando fetch ou outra biblioteca de requisição HTTP
    fetch('http://localhost:3000/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((data) => {
        // Aqui você pode realizar alguma ação com a resposta do servidor, se necessário
        console.log('Resposta do servidor:', data);
      })
      .catch((error) => {
        // Aqui você pode tratar erros, se ocorrer algum problema na requisição
        console.error('Erro na requisição:', error);
      });
  };

  return (
    <div className="row">
      <Title title={'Cadastro de usuário'} text={''} />
      <div className="col-md-6">
        <div className="form-group">
          <p>Dados Pessoais</p>
          <label>Nome:</label>
          <input
            type="text"
            className="form-control"
            value={nome}
            onChange={handleNomeChange}
          />

          <label>Telefone:</label>
          <input
            type="tel"
            className="form-control"
            value={telefone}
            onChange={handleTelefoneChange}
          />

          <label>Endereço:</label>
          <input
            type="text"
            className="form-control"
            value={endereco}
            onChange={handleEnderecoChange}
          />

          <label>CPF:</label>
          <input
            type="text"
            className="form-control"
            value={cpf}
            onChange={handleCpfChange}
          />
        </div>
      </div>

      <div className="col-md-6">
        <div className="form-group">
          <p>Dados do Cartão</p>
          <label>Nome no cartão:</label>
          <input
            type="text"
            className="form-control"
            value={nomeCartao}
            onChange={handleNomeCartaoChange}
          />

          <label>Número do cartão:</label>
          <input
            type="text"
            className="form-control"
            value={numeroCartao}
            onChange={handleNumeroCartaoChange}
          />

          <label>CVV:</label>
          <input
            type="text"
            className="form-control"
            value={cvv}
            onChange={handleCvvChange}
          />
        </div>
      </div>

      <div className="col-md-12">
        <div className="form-group">
          <p>Dados de Acesso</p>
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={handleEmailChange}
          />

          <label>Senha:</label>
          <input
            type="password"
            placeholder='Senha'
            className="form-control"
            value={senha}
            onChange={handleSenhaChange}
          />
          <input
            type="password"
            placeholder='Confirme a Senha'
            className="form-control"
            value={confirmaSenha}
            onChange={handleConfirmaSenhaChange}
          />
        </div>
      </div>

      <div className="col-md-12">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Cadastrar
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
