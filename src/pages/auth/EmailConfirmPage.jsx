import ImageText from '../../components/auth/imageText/ImageText'
import Container from '../../ui/Container/Container'
import EmailConfirmForm from '../../components/auth/emailConfirmForm/EmailConfirmForm'

import emailConfirmIlustrat from "../../assets/auth/emailConfirmIlustrat.svg"

import "../../styles/authStyles/authStyle.scss"

const EmailConfirmPage = () => {
    return (
        <Container>
            <div className="authWrap">
                <ImageText text={"Напишите вашу почту и приступайте к следующему этапу"} image={emailConfirmIlustrat} />
                <EmailConfirmForm />
            </div>
        </Container>
    )
}

export default EmailConfirmPage