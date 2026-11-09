import { useFormik } from 'formik'
import { registerUser } from '../../../api/auth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import Input from '../../../ui/auth/Input/Input'
import Button from '../../../ui/auth/Button/Button'
import AuthExitBtn from '../../../ui/auth/AuthExitBtn/AuthExitBtn'
import Title from '../../../ui/auth/Title/Title'
import { validationRegister } from '../../../code/validation'
import PassItemList from '../PassItemsList/PassItemList'
import Switch from '../../../ui/switch/Switch'

import "../../../styles/authStyles/authStyle.scss"
import styles from "./RegisterForm.module.scss"
import { registerCompany } from '../../../api/company'

const RegisterForm = () => {

    const navigate = useNavigate()
    const [queryErr, setQueryErr] = useState(null)
    const [isCompany, setIsCompany] = useState(false)

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
        validationSchema: validationRegister,
        onSubmit: (values) => {

            const queryObj = {
                ...values,
                date: [
                    "",
                    "",
                    ""
                ],
                about_me: "",
                image: "",
                technologies: [],
                documents: []
            }
            const companyObj = {
                ...values,
                date: [
                    "",
                    "",
                    ""
                ],
                history: "",
                image: "",
                comments: [],
                likes: 0
            }

            if (isCompany) {
                registerCompany(companyObj).then((res) => {
                    if (res.status === 201) {
                        console.log(res);
                        localStorage.setItem("clientId", res.data?.id)
                        localStorage.setItem("isCompany", JSON.stringify(true))
                        localStorage.setItem("authTrue", JSON.stringify(true))
                        navigate("/")
                    }
                }).catch((err) => {
                    setQueryErr(err.message)
                })
            } else {
                registerUser(queryObj).then((res) => {
                    if (res.status === 201) {
                        localStorage.setItem("clientId", res.data?.id)
                        localStorage.setItem("authTrue", JSON.stringify(true))
                        navigate("/")
                    }
                }).catch((err) => {
                    setQueryErr(err.message)
                })
            }
        }
    })

    const { values, handleChange, handleBlur, handleSubmit } = formik

    return (
        <div className="auth-form-wrap">
            <div className="auth-form-content">
                <AuthExitBtn />
                <Title text={"Create account"} />
                <Input error={formik.errors.name} handleChange={handleChange} handleBlur={handleBlur} type={"text"} placeholder={"Name"} name="name" value={values.name} />
                <Input error={formik.errors.email} handleChange={handleChange} handleBlur={handleBlur} type={"text"} placeholder={"Email"} name="email" value={values.email} />
                <Input handleChange={handleChange} handleBlur={handleBlur} type={"password"} placeholder={"Password"} name="password" value={values.password} />
                <PassItemList value={values.password} />
                <Input error={formik.errors.confirm_password} handleChange={handleChange} handleBlur={handleBlur} type={"password"} placeholder={"Confirm password"} name="confirm_password" value={values.confirm_password} />
                <div className={styles.switchWrap}>
                    <p>Вы представляете компанию?</p>
                    <Switch isOn={isCompany} setIsOn={setIsCompany} />
                </div>
                <Button text={"Create"} handleSubmit={handleSubmit} disabled={!formik.isValid} />
                {queryErr && <p className='auth-error-text'>{queryErr}</p>}
            </div>
        </div>
    )
}

export default RegisterForm