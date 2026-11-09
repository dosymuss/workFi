import { useState } from "react"
import styles from "./CompanyVacansiesItem.module.scss"
import VacanseUserCard from "../VacanseUserCard/VacanseUserCard"
import { useActionVacansy } from "../../../hooks/useActionVacansy"

const StatusBtn = ({ status, vacansyId }) => {

    const [statusBtn, setStatusBtn] = useState(status)

    const { patchVacansy } = useActionVacansy()

    const toggleStatus = () => {
        const newStatus = !statusBtn
        setStatusBtn(newStatus)
        patchVacansy({
            id: vacansyId,
            data: {
                status: newStatus
            }
        })
    }

    return (
        <button onClick={() => {
            toggleStatus()
        }} style={{ backgroundColor: statusBtn ? "var(--acGreen)" : "var(--red)" }} className={styles.statusBtn}>{statusBtn ? "Активные" : "Закрытые"}</button>
    )
}

const CompanyVacansiesItem = ({ vacansy }) => {

    const [open, setOpen] = useState(false)

    return (
        <div className={styles.mainBtn}>
            <div className={styles.openBtn} >
                <div className={styles.row}>
                    <p className={styles.cell} onClick={() => setOpen(!open)}>{vacansy?.name}</p>
                    <p className={styles.cell} onClick={() => setOpen(!open)}>{vacansy?.price}</p>
                    <p className={styles.cell} onClick={() => setOpen(!open)}>{vacansy?.response?.length}</p>
                    <p className={styles.cell} onClick={() => setOpen(!open)}>{vacansy?.response?.length}</p>
                    <StatusBtn status={vacansy?.status} vacansyId={vacansy?.id} />
                </div>
            </div>

            {
                open &&
                <div className={styles.userCardWrap}>
                    <h4>Откликнувшиеся пользователи:</h4>
                    <div className={styles.cardsWrap}>
                        {
                            vacansy?.response &&
                            vacansy?.response?.map((item) => (
                                <VacanseUserCard vacansyId={vacansy?.id} response={item} />
                            ))
                        }
                    </div>
                </div>
            }

        </div>
    )
}

export default CompanyVacansiesItem