import { Link } from "react-router-dom"

import logo from "../../assets/logo.svg"

import styles from "./Logo.module.scss"

const Logo = () => {
    return (
        <Link to={"/"} className={styles.main}>
            <img src={logo} alt="" />
            <h4>WorkFi</h4>
        </Link>
    )
}

export default Logo