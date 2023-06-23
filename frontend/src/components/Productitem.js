import React from 'react';

const ProductItem = (props) => {
  const { image, name, category, description, total, note, quantity } = props;

  return (
    <div style={styles.container}>
      <div style={styles.productContainer}>
        <div style={styles.imageContainer}>
          <img src={image} alt="Product" style={styles.image} />
        </div>
        <div style={styles.infoContainer}>
          <h2 style={styles.name}>{name}</h2>
          <p style={styles.category}>{category}</p>
          <p style={styles.description}>{description}</p>
          <p style={styles.total}>Total: {total}</p>
          <p style={styles.note}>Nota: {note}</p>
          <p style={styles.quantity}>Quantidade: {quantity}</p>
          <button style={styles.addButton}>Adicionar ao carrinho</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    backgroundColor: '#f0f0f0',
  },
  productContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '600px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    flex: '0 0 auto',
    marginRight: '20px',
  },
  image: {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
  },
  infoContainer: {
    flex: '1 1 auto',
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  category: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  description: {
    marginBottom: '10px',
  },
  total: {
    marginBottom: '5px',
  },
  note: {
    marginBottom: '5px',
  },
  quantity: {
    marginBottom: '10px',
  },
  addButton: {
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

export default ProductItem;
