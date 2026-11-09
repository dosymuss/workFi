import styles from "./Spinner.module.scss"

const Spinner = ({ style }) => {
    return (
        <span className={styles.loader}></span>
    )
}

export default Spinner