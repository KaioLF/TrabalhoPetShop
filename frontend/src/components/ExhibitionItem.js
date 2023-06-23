import React from 'react';

const ExhibitionItem = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.categoryTitle}>Categoria</h2>
      <div style={styles.productsContainer}>
        <div style={styles.item}>
          <div style={styles.imageContainer}>
            <img src="caminho-da-imagem-da-api" alt="Imagem do produto" style={styles.image} />
          </div>
          <h3 style={styles.productName}>Nome do Produto</h3>
          <p style={styles.price}>Preço</p>
          <button style={styles.detailsButton}>Detalhes</button>
        </div>
        
        {/* Repita a estrutura acima para mais produtos */}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    padding: '20px',
  },
  categoryTitle: {
    fontSize: '18px',
    marginBottom: '10px',
    width: '100%',
    textAlign: 'center',
  },
  productsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '300px',
    margin: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    marginBottom: '10px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  productName: {
    fontSize: '16px',
    marginBottom: '5px',
  },
  price: {
    fontSize: '14px',
    marginBottom: '10px',
  },
  detailsButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    backgroundColor: '#ccc',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ExhibitionItem;
