import { useFormik } from 'formik'

import Title from '../../../ui/auth/Title/Title'
import Input from '../../../ui/auth/Input/Input'
import Button from '../../../ui/auth/Button/Button'

import "../../../styles/authStyles/authStyle.scss"
import AuthExitBtn from '../../../ui/auth/AuthExitBtn/AuthExitBtn'

const EmailConfirmForm = () => {

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    return (
        <div className="auth-form-wrap">
            <div className="auth-form-content">
                <AuthExitBtn />
                <Title text={"Confirm your email"} />
                <Input name="email" value={formik.email} handleBlur={formik.handleBlur} handleChange={formik.handleChange} placeholder={"Email"} type={"text"} />
                <Button handleSubmit={formik.handleSubmit} text={"Confirm"} />
            </div>
        </div>
    )
}

export default EmailConfirmForm