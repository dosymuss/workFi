import { useState } from "react"
import TagsModal from "../tagsModal/TagsModal"
import styles from "./ProfileSkillsBlock.module.scss"

const Tags = ({ text }) => {
    return (
        <div className={styles.tags}>
            <p>{text}</p>
        </div>
    )
}

const ProfileSkillsBlock = ({ skills, handleTechChange, deleteTech }) => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div>
            <div className={styles.titleDiv}>
                <p>Your documents</p>
                <button onClick={() => setOpenModal(true)}>
                    Edit
                </button>
            </div>

            <div className={styles.tagsWrap}>
                {
                    skills.map((item) => (
                        <Tags text={item} />
                    ))
                }
            </div>
            <TagsModal deleteTech={deleteTech} skills={skills} handleTechChange={handleTechChange} open={openModal} onClose={() => setOpenModal(false)} />
        </div>
    )
}

export default ProfileSkillsBlock