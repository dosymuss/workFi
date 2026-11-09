import { useState } from "react"
import profileImageSceleton from "../../../assets/profile/profileImageSceleton.svg"
import editImageIcon from "../../../assets/profile/editImageIcon.svg"

import styles from "./ProfileImage.module.scss"
import ImageModal from "../imageModal/ImageModal"

const ProfileImageSceleton = () => {
  return (
    <div className={styles.sceletonWrap}>
      <img src={profileImageSceleton} alt="" />
    </div>
  )
}


const ProfileImage = ({ image, setImage, handleChangeImage }) => {  

  const [openModal, setOpenModal] = useState(false)


  return (
    <div className={styles.main}>
      <button onClick={() => setOpenModal(true)} className={styles.editImageBtn}>
        <img src={editImageIcon} alt="" />
      </button>
      {image ?
        <img className={styles.userImage} src={image} alt="" />
        :
        <ProfileImageSceleton />
      }
      <ImageModal handleChangeImage={handleChangeImage} image={image} setImage={setImage} open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  )
}

export default ProfileImage