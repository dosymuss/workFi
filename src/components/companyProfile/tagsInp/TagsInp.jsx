import { useState } from "react"
import Input from "../../../ui/auth/Input/Input"
import styles from "./TagsInp.module.scss"


const Tags = ({ text }) => {
    return (
        <p className={styles.tags}>{text}</p>
    )
}

const TagsInp = ({ value, setValue}) => {


    return (
        <div>
            <label className={styles.inputWrap}>
                <h4>Требуемые навыки</h4>
                <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder={"js ts react html"} />
            </label>
            <div className={styles.tagsWrap}>
                {
                    value && value?.length > 0 &&
                    value?.split(" ")?.map((item) => (
                        <Tags text={item} />
                    ))
                }

            </div>
        </div>
    )
}

export default TagsInp