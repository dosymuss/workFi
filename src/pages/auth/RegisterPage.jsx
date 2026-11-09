import ImageText from "../../components/auth/imageText/ImageText"
import Container from "../../ui/Container/Container"

import loginIllustration from "../../assets/auth/loginIlustrat.svg"
import RegisterForm from "../../components/auth/RegisterForm/RegisterForm"

import "../../styles/authStyles/authStyle.scss"

const RegisterPage = () => {
    return (
        <Container>
            <div className="authWrap">
                <ImageText text={"Поиск работы мечты"} image={loginIllustration} />
                <RegisterForm />
            </div>
        </Container>
    )
}

export default RegisterPage