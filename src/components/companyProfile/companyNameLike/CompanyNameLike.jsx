
import likeIcon from "../../../assets/vacansy/likeIcon.svg"
import imageIcon from "../../../assets/profile/imageSceleton.svg"

import styles from "./CompanyNameLike.module.scss"

const CompanyNameLike = ({ company }) => {
    return (
        <div className={styles.main}>
            <div className={styles.textAndImg}>
                {
                    company?.image ?
                        <img className={styles.mainImg} src={company?.image} alt="" /> :
                        <div className={styles.imageSceleton}>
                            <img src={imageIcon} alt="" />
                        </div>

                }
                <div>
                    <h3>{company?.name}</h3>
                    <p>{company?.date ? company.date?.join("."):"00.00.0000"}</p>
                </div>
            </div>
            <div className={styles.likeDiv}>
                <img src={likeIcon} alt="" />
                <p>{company?.likes ? company.likes : "0"}</p>
            </div>
        </div>
    )
}

export default CompanyNameLike