import React from 'react'
import Navbar from '../components/Navbar'
import Title from '../components/Title'
import CheckoutLister from '../components/CheckoutLister'
import Footer from '../components/Footer'

const Checkout = () => {
  return (
    <div>
        <Navbar />
        <Title title="PET SHOP"/>
        <CheckoutLister />
        <Footer />
    </div>
  )
}

export default Checkout