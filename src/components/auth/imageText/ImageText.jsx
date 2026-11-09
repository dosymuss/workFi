import AuthTitle from '../../../ui/auth/AuthTitle/AuthTitle'

import styles from "./ImageText.module.scss"

const ImageText = ({image, text}) => {
    return (
        <div className={styles.main}>
            <img src={image} alt="" />
            <AuthTitle titleText={text} />
        </div>
    )
}

export default ImageText