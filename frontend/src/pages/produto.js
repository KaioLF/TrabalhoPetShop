import React from 'react'
import Navbar from '../components/Navbar'
import Title from '../components/Title'
import ProductItem from '../components/Productitem'
import CommentSection from '../components/CommentSection'
import Footer from '../components/Footer'

const Produto = () => {

    const product = {
        id: 1,
        name: "Produto A",
        category: "Categoria A",
        description: "Descrição do Produto A",
        total: "R$ 99,99",
        note: "4.5",
        quantity: 10,
        image: "https://example.com/path/to/image.jpg" // URL da imagem obtida da API
    }

  return (
    <div>
    <Navbar />
    <Title title="Produto - PET SHOP"/>
    <ProductItem
    image={product.image}
    name={product.name}
    category={product.category}
    description={product.description}
    total={product.total}
    note={product.note}
    quantity={product.quantity} />
    <CommentSection />
    <Footer />
    

    </div>
  )
}

export default Produto