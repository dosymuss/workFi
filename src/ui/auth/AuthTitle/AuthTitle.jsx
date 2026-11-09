import styles from "./AuthTitle.module.scss"

const AuthTitle = ({ titleText }) => {
    return (
        <div className={styles.main}>
            <h3>WorkFi</h3>
            <span>{titleText}</span>
        </div>
    )
}

export default AuthTitle