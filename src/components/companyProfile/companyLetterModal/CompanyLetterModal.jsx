import { useEffect, useRef, useState } from "react"
import { useActionCompany } from "../../../hooks/useActionCompany"

import closeIcon from "../../../assets/profile/xIcon.svg"

import styles from "./CompanyLetterModa.module.scss"


const CompanyLetterModal = ({ open, onClose, letter }) => {
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
                <h3 className={styles.title}>Сопроводительное письмо пользователя</h3>
                <h4>{letter}</h4>
            </div>

        </dialog>
    )
}

export default CompanyLetterModal