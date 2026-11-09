import Container from '../../ui/Container/Container'
import ImageText from '../../components/auth/imageText/ImageText'

import createPassIlustrat from "../../assets/auth/createPassIlustrat.svg"
import CreatePassForm from '../../components/auth/CreatePassForm/CreatePassForm'

import '../../styles/authStyles/authStyle.scss'

const CreatePassPage = () => {
    return (
        <Container>
            <div className="authWrap">
                <ImageText text={"Создайте пароль"} image={createPassIlustrat} />
                <CreatePassForm />
            </div>
        </Container>
    )
}

export default CreatePassPage