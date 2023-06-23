import React from 'react';
import Navbar from '../components/Navbar'
import Title from '../components/Title'
import SearchBar from '../components/SearchBar'
import ExhibitionItem from '../components/ExhibitionItem'

const Home = () => {
    return (
      <div>
         <Navbar />
         <Title title="PET SHOP"/>
         <SearchBar />
         <ExhibitionItem />
            
      </div>
    );
  };

  export default Home;