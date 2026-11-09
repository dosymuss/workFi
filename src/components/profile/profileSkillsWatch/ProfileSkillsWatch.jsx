
import styles from "./ProfileSkillsWatch.module.scss"

const Tags = ({ text }) => {
    return (
        <div className={styles.tags}>
            <p>{text}</p>
        </div>
    )
}

const ProfileSkillsWatch = ({ skills }) => {

    return (
        <div>
            <div className={styles.titleDiv}>
                <p>Your documents</p>
            </div>

            <div className={styles.tagsWrap}>
                {
                    skills?.map((item) => (
                        <Tags text={item} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProfileSkillsWatch