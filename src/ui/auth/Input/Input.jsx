import { useState } from "react"

import eyeClose from "../../../assets/auth/eyeClose.svg"
import eyeOpen from "../../../assets/auth/eyeOpen.svg"

import styles from "./Input.module.scss"

const Input = ({ type, placeholder, handleChange, handleBlur, error, ...props }) => {

    const [inpType, setInpType] = useState(type)

    const handleToggle = () => {
        if (inpType === "password") {
            setInpType("text")
        } else {
            setInpType("password")
        }
    }

    return (
        type !== "password" ?
            <label className={styles.textLabel}>
                <input className={styles.inp} placeholder={placeholder} type="text" onChange={handleChange} onBlur={handleBlur} {...props} />
                {error && <p className={styles.errText}>{error}</p>}
            </label>
            :
            <div className={styles.inpPassWrap}>
                <div className={styles.inpPass}>
                    <input type={inpType} placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} {...props} />
                    <button onClick={handleToggle}>
                        <img src={inpType === "text" ? eyeOpen : eyeClose} alt="" />
                    </button>
                </div>
                {error && <p className={styles.errText}>{error}</p>}
            </div>
    )
}

export default Input