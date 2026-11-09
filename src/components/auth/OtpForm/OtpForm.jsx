

import AuthExitBtn from "../../../ui/auth/AuthExitBtn/AuthExitBtn"
import Button from "../../../ui/auth/Button/Button"
import PinInput from "../../../ui/auth/PinInput/PinInput"
import Title from "../../../ui/auth/Title/Title"

import "../../../styles/authStyles/authStyle.scss"
import styles from "./OtpForm.module.scss"

const OtpForm = () => {


    return (
        <div className="auth-form-wrap">
            <div className="auth-form-content">
                <AuthExitBtn />
                <Title text={"Confirm your email"} />
                <div className={styles.otpInpWrap}>
                    <PinInput />
                </div>
                <Button text={"Confirm"} />
            </div>
        </div>
    )
}

export default OtpForm