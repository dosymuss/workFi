import { useEffect, useRef, useState } from "react"

import closeIcon from "../../../assets/profile/xIcon.svg"
import { useActionVacansy } from "../../../hooks/useActionVacansy"

import styles from "./VacansyLetterModal.module.scss"


const VacansyLetterModal = ({ open, onClose, vacansy }) => {
    const modalRef = useRef(null)

    const [value, setValue] = useState("")

    const { patchVacansy } = useActionVacansy()

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

    const handleResponseVacansy = () => {
        patchVacansy({
            id: vacansy.id,
            data: {
                response: [
                    ...vacansy.response,
                    {
                        userId: clientId,
                        text: value,
                        status: ""
                    }
                ]
            }
        })
        onClose()
    }

    return (
        <dialog
            ref={modalRef}
            className={`${styles.dialog} ${styles.centered}`}
            onClick={handleBackdropClick}
        >
            <div className={styles.modalWrap}>
                <h3 className={styles.title}>Расскажите, почему вы заинтересованы в этой вакансии, и напишите сопроводительное письмо.</h3>
                <textarea className={styles.letterInp} placeholder="Ваше сопроводительное письмо" value={value} onChange={(e) => setValue(e.target.value)}></textarea>
                <button className={styles.subBtn} onClick={handleResponseVacansy}>Отправить</button>
            </div>

        </dialog>
    )
}

export default VacansyLetterModal