import { Link } from "react-router-dom"

import likeIcon from "../../../assets/vacanseCard/likeicon.svg"
import likeAccIcon from "../../../assets/vacanseCard/likeAcc.svg"
import Tags from "../../../ui/main/Tags/Tags"

import styles from "./VacanseCard.module.scss"
import { useState } from "react"
import { useActionVacansy } from "../../../hooks/useActionVacansy"




const VacanseCard = ({ vacansy }) => {

    console.log(vacansy);

    const clientId = localStorage.getItem("clientId")

    const [isLiked, setIsLiked] = useState(vacansy?.who_liked?.includes(clientId) ? true : false)

    const { patchVacansy } = useActionVacansy()

    const handleLike = () => {
        if (isLiked) {
            patchVacansy({
                id: vacansy?.id,
                data: {
                    who_liked: vacansy?.who_liked?.filter((item) => item !== clientId)
                }
            })
            setIsLiked(!isLiked)
        } else {
            patchVacansy({
                id: vacansy?.id,
                data: {
                    who_liked: [...vacansy?.who_liked, clientId]
                }
            })
            setIsLiked(!isLiked)
        }
    }



    return (
        <div className={styles.main}>
            <div className={styles.titleAndLike}>
                <Link to={`/vacansy/${vacansy.id}`}>{vacansy.name}</Link>
                <button onClick={handleLike}>
                    <img src={isLiked ? likeAccIcon : likeIcon} alt="" />
                </button>
            </div>

            <div className={styles.tagsAndPrice}>
                <p>{vacansy?.price} com</p>
                <div>
                    {
                        vacansy?.technologies?.slice(0, 3).map((item, index) => (
                            <Tags key={index} text={item} />
                        ))
                    }
                </div>
            </div>

            <Link to={`/company/${vacansy?.companyId}`} className={styles.companyLink}>{vacansy.companyName}</Link>

            <Link to={`/vacansy/${vacansy.id}`} className={styles.sendBtn}>
                Отправить
            </Link>


        </div>
    )
}

export default VacanseCard