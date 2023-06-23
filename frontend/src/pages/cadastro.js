import Title from "../components/Title";
import Navbar from "../components/Navbar";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";

const Cadastro = () => {
    return (
      <div>
          <Navbar />
          <Title title="PET SHOP"/>
          <RegisterForm />
          <Footer />
      </div>
    )
  }

  export default Cadastro;