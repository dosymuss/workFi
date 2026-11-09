import React, { useEffect, useRef, useState } from 'react'

import closeIcon from "../../../assets/profile/xIcon.svg"

import styles from "./ImageModal.module.scss"



const EditImageWrap = ({ image, setImage, handleChangeImage, onClose }) => {
    const [value, setValue] = useState("")

    const handleAdd = () => {
        if (value.trim()) {
            setImage(value)
            handleChangeImage(value)
            onClose()
        }
    }

    useEffect(() => {
        setValue(image)
    }, [image])

    return (
        <div className={styles.addInpWrap}>
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder='https://...'
            />
            <button onClick={handleAdd}>Edit</button>
        </div>
    )
}

const ImageModal = ({ open, onClose, image, setImage, handleChangeImage }) => {
    const modalRef = useRef(null)



    useEffect(() => {
        const dialog = modalRef.current
        if (!dialog) return

        const handleCancel = (e) => {
            e.preventDefault()
            onClose()
        }

        dialog.addEventListener("cancel", handleCancel)

        if (open) {
            if (!dialog.open) {
                dialog.showModal()
            }
        } else {
            if (dialog.open) {
                dialog.close()
            }
        }

        return () => {
            dialog.removeEventListener("cancel", handleCancel)
        }
    }, [open])

    // Функция закрытия при клике по фону (dialog)
    const handleBackdropClick = (e) => {
        if (e.target.tagName === 'DIALOG') {
            onClose()
        }
    }

    return (
        <dialog
            ref={modalRef}
            className={`${styles.dialog} ${styles.centered}`}
            onClick={handleBackdropClick}
        >
            <div className={styles.modalWrap}>
                <div className={styles.titleCloseWrap}>
                    <h3>Your profile image</h3>
                    <button onClick={onClose}>
                        <img src={closeIcon} alt="close" />
                    </button>
                </div>

                <EditImageWrap image={image} onClose={onClose} handleChangeImage={handleChangeImage} setImage={setImage} />

            </div>

        </dialog>
    )
}

export default ImageModal