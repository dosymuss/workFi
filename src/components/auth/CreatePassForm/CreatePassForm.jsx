import { useFormik } from "formik"

import AuthExitBtn from "../../../ui/auth/AuthExitBtn/AuthExitBtn"
import Title from "../../../ui/auth/Title/Title"
import Input from "../../../ui/auth/Input/Input"
import PassItemList from "../PassItemsList/PassItemList"
import Button from "../../../ui/auth/Button/Button"

import "../../../styles/authStyles/authStyle.scss"

const CreatePassForm = () => {

    const formik = useFormik({
        initialValues: {
            password: "",
            confirm_password: ""
        },
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const { values, handleChange, handleBlur, handleSubmit } = formik

    return (
        <div className="auth-form-wrap">
            <div className="auth-form-content">
                <AuthExitBtn />
                <Title text={"Create password"} />
                <Input handleChange={handleChange} handleBlur={handleBlur} type={"password"} placeholder={"Password"} name="password" value={values.password} />
                <PassItemList value={values.password} />
                <Input handleChange={handleChange} handleBlur={handleBlur} type={"password"} placeholder={"Confirm password"} name="confirm_password" value={values.confirm_password} />
                <Button text={"Create"} handleSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default CreatePassForm