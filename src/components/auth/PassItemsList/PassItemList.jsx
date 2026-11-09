import styles from "./PassItemList.module.scss"


const PassItemList = ({ value = "" }) => {
    return (
        <div>
            <p className={styles.title}>Ваш пароль должен содержать:</p>
            <ul className={styles.list}>
                <li style={{ color: /[A-ZА-Я]/g.test(value) ? "#49A078" : "#767a7f" }}>Минимум одну заглавную букву.</li>
                <li style={{ color: value?.length > 6 ? "#49A078" : "#767a7f" }}>Более 6 символов.</li>
                <li style={{ color: /\d/g.test(value) ? "#49A078" : "#767a7f" }}>Хотя бы одно число.</li>
                <li style={{ color: /[^\w\s]/g.test(value) ? "#49A078" : "#767a7f"}}>Один специальный символ </li>
            </ul >
        </div >
    )
}

export default PassItemList