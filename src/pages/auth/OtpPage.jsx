import ImageText from "../../components/auth/imageText/ImageText"
import Container from "../../ui/Container/Container"

import emailConfirmIlustrat from "../../assets/auth/emailConfirmIlustrat.svg"

import "../../styles/authStyles/authStyle.scss"
import OtpForm from "../../components/auth/OtpForm/OtpForm"

const OtpPage = () => {
    return (
        <Container>
            <div className="authWrap">
                <ImageText text={"Подтвердите вашу почту и приступайте к следующему этапу"} image={emailConfirmIlustrat} />
                <OtpForm />
            </div>
        </Container>
    )
}

export default OtpPage