import loginIllustration from "../../assets/auth/loginIlustrat.svg"
import ImageText from "../../components/auth/imageText/ImageText"
import LoginForm from "../../components/auth/LoginForm/LoginForm"
import Container from "../../ui/Container/Container"

import "../../styles/authStyles/authStyle.scss"

const LoginPage = () => {
  return (
    <Container>
      <div className="authWrap">
        <ImageText text={"Поиск работы мечты"} image={loginIllustration} />
        <LoginForm />
      </div>
    </Container>



  )
}

export default LoginPage