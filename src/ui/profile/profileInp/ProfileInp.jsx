import styles from "./ProfileInp.module.scss"

const ProfileInp = ({ text, textarea = false, value, placeholder, ...props }) => {
    return (
        <label className={styles.inpLabel}>
            <p>{text}</p>
            {textarea ?
                <textarea value={!!value ? value : ""} placeholder={placeholder} {...props}></textarea> :
                <input value={!!value ? value : ""} placeholder={placeholder} type="text" {...props} />
            }
        </label>
    )
}

export default ProfileInp