import { useEffect, useRef, useState } from "react"
import { useActionCompany } from "../../../hooks/useActionCompany"

import closeIcon from "../../../assets/profile/xIcon.svg"

import styles from "./CompanyCommentsModal.module.scss"


const CompanyCommentsModal = ({ open, onClose, companyId, comments }) => {
    const modalRef = useRef(null)

    const { patchCompany } = useActionCompany()
    const [value, setValue] = useState("")

    const clientId = localStorage.getItem("clientId")


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

    const handleSubmit = () => {
        patchCompany({
            id: companyId,
            data: {
                comments: [
                    ...comments,
                    {
                        userId: clientId,
                        text: value
                    }
                ]
            }
        })
        onClose()
        window.location.reload()
    }

    return (
        <dialog
            ref={modalRef}
            className={`${styles.dialog} ${styles.centered}`}
            onClick={handleBackdropClick}
        >
            <div className={styles.modalWrap}>
                <h3 className={styles.title}>Поделитесь своими впечатлениями о компании</h3>
                <textarea value={value} onChange={(e) => setValue(e.target.value)} className={styles.letterInp} placeholder="Напишите комментарий" ></textarea>
                <button className={styles.subBtn} onClick={handleSubmit}>Создать</button>
            </div>

        </dialog>
    )
}

export default CompanyCommentsModal