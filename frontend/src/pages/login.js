import React from 'react'
import Navbar from '../components/Navbar';
import Title from '../components/Title'
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer'

const Login = () => {
  return (
    <div>
        <Navbar />
        <Title title="PET SHOP"/>
        <LoginForm />
        <Footer />

    </div>
  )
}

export default Login;