import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        ESTE É O ECOMMERCE DE : KAIO, IVAN E JONAS. S2
      </p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#f0f0f0',
    padding: '100px',
    textAlign: 'down',
  },
  text: {
    fontSize: '16px',
    color: '#333',
  },
};

export default Footer;
