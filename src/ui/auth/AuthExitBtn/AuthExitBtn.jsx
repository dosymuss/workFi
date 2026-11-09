import { useNavigate } from "react-router-dom"

import exitIcon from "../../../assets/auth/exit.svg"

import styles from "./AuthExitBtn.module.scss"

const AuthExitBtn = () => {

    const navigate = useNavigate()

    return (
        <button className={styles.btn} onClick={() => navigate(-1)}>
            <img src={exitIcon} alt="" />
        </button>
    )
}

export default AuthExitBtn