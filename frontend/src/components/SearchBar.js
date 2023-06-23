import React from 'react';

const SearchBar = () => {
  return (
    <div style={styles.container}>
      <input type="text" placeholder="Pesquisar" style={styles.input} />
      <div style={styles.filterContainer}>
        <button style={styles.filterButton}>Maior para o Menor</button>
        <button style={styles.filterButton}>Menor para o Maior</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

  },
  input: {
    width: '300px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  filterContainer: {
    marginLeft: '10px',
  },
  filterButton: {
    marginLeft: '5px',
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '5px',
    backgroundColor: '#ccc',
    border: 'none',
    cursor: 'pointer',
  },
};

export default SearchBar;
