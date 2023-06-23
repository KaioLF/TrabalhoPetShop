import React, { useState, useEffect } from 'react';

const CheckoutLister = () => {
  const [selectedProducts, setSelectedProducts] = useState([]); // Estado para armazenar os produtos selecionados

  const customerAddress = 'Endereço do cliente';
  const customerCardInfo = 'Informações do cartão do cliente';

  const handlePlaceOrder = () => {
    // Lógica para finalizar o pedido
    console.log('Pedido finalizado');
  };

  // Função para carregar os produtos selecionados (pode ser uma chamada de API ou qualquer outra forma de obter os dados do pedido)
  const loadSelectedProducts = async () => {
    // Simulação de chamada de API para obter os produtos cadastrados no pedido
    const response = await fetch('http://localhost:3000/orders/orderRegister');
    const data = await response.json();

    // Atualiza o estado dos produtos selecionados com os dados obtidos
    setSelectedProducts(data.selectedProducts);
  };

  // Carrega os produtos selecionados ao renderizar o componente
  useEffect(() => {
    loadSelectedProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>
      <div style={styles.productSection}>
        <h3 style={styles.sectionTitle}>Produtos selecionados:</h3>
        <ul style={styles.productList}>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.name} - Quantidade: {product.quantity}
            </li>
          ))}
        </ul>
      </div>
      <div style={styles.addressSection}>
        <h3 style={styles.sectionTitle}>Endereço para entrega:</h3>
        <p>{customerAddress}</p>
      </div>
      <div style={styles.cardSection}>
        <h3 style={styles.sectionTitle}>Cartão para compra:</h3>
        <p>{customerCardInfo}</p>
      </div>
      <div style={styles.totalSection}>
        <h3 style={styles.totalTitle}>Total:</h3>
        <p style={styles.totalAmount}>$100.00</p>
      </div>
      <button style={styles.button} onClick={handlePlaceOrder}>
        Finalizar Pedido
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
    width: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productList: {
    marginBottom: '20px',
    paddingLeft: '20px',
  },
  addressSection: {
    marginBottom: '20px',
  },
  cardSection: {
    marginBottom: '20px',
  },
  totalSection: {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  totalTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginRight: '10px',
  },
  totalAmount: {
    fontSize: '20px',
  },
  button: {
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

export default CheckoutLister;
