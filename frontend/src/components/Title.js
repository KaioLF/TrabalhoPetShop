import React from 'react';

const Title = (props) => {
  const { title } = props;
  
  return <h1 style={styles.title}>{title}</h1>;
};

const styles = {
  title: {
    fontSize: '32px',
    color: '#333',
    textAlign: 'center',
    marginTop: '20px',
    marginBottom: '40px',
    fontWeight: 'bold',
  },
};

export default Title;
