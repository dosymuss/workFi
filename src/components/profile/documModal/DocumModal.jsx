import { useEffect, useRef, useState } from 'react'

import closeIcon from "../../../assets/profile/xIcon.svg"

import styles from "./DocumModal.module.scss"



const EditDocumWrap = ({ docum, setDocum }) => {
    const [value, setValue] = useState("")
    const [name, setName] = useState("")

    const handleAdd = () => {
        if (value.trim() && name.trim()) {
            setDocum([...docum, {
                name: name,
                url: value
            }])
        }
    }

    return (
        <div className={styles.addInpWrap}>
            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder='myCv'
            />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder='https://...'
            />
            <button onClick={handleAdd} disabled={!value.trim() || !name.trim()}>Edit</button>
        </div>
    )
}

const DocumModal = ({ open, onClose, setDocum, docum }) => {
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

                <EditDocumWrap docum={docum} setDocum={setDocum} />

            </div>

        </dialog>
    )
}

export default DocumModal