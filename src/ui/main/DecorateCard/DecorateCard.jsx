import { useNavigate } from "react-router-dom"
import styles from "./DecorateCard.module.scss"

const DecorateCard = ({ img, text, position, imageStyle, path }) => {
    const navigate = useNavigate()
    return (
        <div onClick={() => navigate(path)} className={styles.main} style={{ backgroundPosition: position === "top" ? "150px -60px" : "-60px 150px" }}>
            <h3>{text}</h3>

            <img className={styles.image} style={imageStyle} src={img} alt="" />

        </div >
    )
}

export default DecorateCard