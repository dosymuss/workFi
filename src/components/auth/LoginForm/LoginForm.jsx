import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Title from "../../../ui/auth/Title/Title"
import Input from "../../../ui/auth/Input/Input"
import Button from "../../../ui/auth/Button/Button"
import { validationLogin } from "../../../code/validation";
import { getAllUsers } from "../../../api/auth";
import Switch from "../../../ui/switch/Switch";

import "../../../styles/authStyles/authStyle.scss"
import styles from "./LoginForm.module.scss"
import { getAllCompany } from "../../../api/company";

const LoginForm = () => {
    const [mainErr, setMainErr] = useState("")
    const [isCompany, setIsCompany] = useState(false)


    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationLogin,
        onSubmit: async (values) => {
            try {
                const res = isCompany ? await getAllCompany() : await getAllUsers();
                const data = res.data;

                const findUser = data?.find((item) => item?.email === values.email);

                if (!findUser) {
                    setMainErr("Неправильный email или пароль");
                    return;
                }

                if (findUser.password !== values.password) {
                    setMainErr("Неправильный email или пароль");
                    return;
                }



                // Если всё совпадает
                localStorage.setItem("authTrue", JSON.stringify(true));
                localStorage.setItem("isCompany", JSON.stringify(isCompany));
                localStorage.setItem("clientId", findUser.id)
                navigate("/");
            } catch (error) {
                setMainErr("Произошла ошибка при авторизации");
                console.error(error);
            }

        }
    })

    return (
        <div className={styles.wrap}>
            <div className={styles.content}>
                <Title text={"Welcome back!"} />
                <Input error={formik.errors.email} name="email" value={formik.email} handleBlur={formik.handleBlur} handleChange={formik.handleChange} placeholder={"Email"} type={"text"} />
                <div className={styles.passWrap}>
                    <Link to={
                        // "/auth/confirm-email"
                        "#"
                    }>Forgotten password</Link>
                    <Input error={formik.errors.password} name="password" value={formik.password} handleBlur={formik.handleBlur} handleChange={formik.handleChange} placeholder={"Password"} type={"password"} />
                </div>
                <div className={styles.switchWrap}>
                    <p>Вы представляете компанию?</p>
                    <Switch isOn={isCompany} setIsOn={setIsCompany} />
                </div>
                <Button disabled={!formik.isValid} handleSubmit={formik.handleSubmit} text={"Confirm"} />
                {mainErr && <p className="auth-error-text">{mainErr}</p>}
                <Link to={"/auth/register"} style={{ fontWeight: "500", paddingTop: "10px" }}>У меня don’t have аккаунт</Link>
            </div>
        </div>
    )
}

export default LoginForm