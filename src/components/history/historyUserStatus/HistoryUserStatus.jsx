import styles from './HistoryUserStatus.module.scss';

const StatusBtn = ({ status }) => {
    const config = {
        success: {
            color: "var(--acGreen)",
            text: "Собеседование"
        },
        rejected: {
            color: "var(--red)",
            text: "Отказано"
        },
        "": {
            color: "var(--yellow)",
            text: "Ожидает ответа"
        }
    }

    const current = config[status] || config[""]

    return (
        <button style={{ backgroundColor: current.color }} className={styles.statusBtn}>
            {current.text}
        </button>
    )
}


const HistoryUserStatus = ({ vacansy }) => {

    const clientId = localStorage.getItem("clientId")

    const ourResponse = vacansy?.response?.find((item) => item?.userId === clientId)


    return (
        <div className={styles.row}>
            <p className={styles.cell}>{vacansy?.name}</p>
            <p className={styles.cell}>{vacansy?.price}</p>
            <p className={styles.cell}>{vacansy?.response?.length}</p>
            <p className={styles.cell}>{vacansy?.response?.length}</p>
            <StatusBtn status={ourResponse?.status} />
        </div>
    )
}

export default HistoryUserStatus