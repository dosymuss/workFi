import HistoryUserStatus from "../../components/history/historyUserStatus/HistoryUserStatus"
import Container from "../../ui/Container/Container"
import CompanyVacansiesItem from "../../components/vacansy/CompanyVacansiesItem/CompanyVacansiesItem"

import activeCard from "../../assets/vacansy/activeCard.svg"
import closeCard from "../../assets/vacansy/closeCard.svg"

import styles from "./CompanyVacansies.module.scss"
import { useActionCompany } from "../../hooks/useActionCompany"
import { useSelector } from "react-redux"
import { useEffect } from "react"


const VacansyTableTitles = () => {
    return (
        <div className={styles.header}>
            <p className={styles.cell}>Название вакансии</p>
            <p className={styles.cell}>Начальная ставка</p>
            <p className={styles.cell}>Количество просмотров</p>
            <p className={styles.cell}>Количество откликов</p>
            <p className={styles.cell}>Статус вакансии</p>
        </div>
    )
}

const FiltersBtns = () => {
    return (
        <div className={styles.approveBtns}>
            <button>
                <img src={activeCard} alt="" />
                <p>Активные</p>
            </button>
            <button>
                <img src={closeCard} alt="" />
                <p>Закрытые</p>
            </button>
        </div>
    )
}


const CompanyVacansies = () => {

    const { fetchCompanyVacansies } = useActionCompany()
    const { my_vacansies } = useSelector(state => state.company)

    const clientId = localStorage.getItem("clientId")

    useEffect(() => {
        fetchCompanyVacansies(clientId)
    }, [])


    return (
        <Container style={{ marginBottom: "50px" }}>
            <div className={styles.main}>
                <h2 className={styles.title}>Vacancies</h2>
                <div className={styles.titleAndBtns}>
                    <h3 className={styles.titleSmall}>Your vacancies</h3>
                    {/* <FiltersBtns /> */}
                </div>
                <VacansyTableTitles />
                <div className={styles.userStatusWrap}>
                    {
                        my_vacansies && my_vacansies?.length > 0 ?
                            my_vacansies?.map((item) => (
                                <CompanyVacansiesItem key={item?.id} vacansy={item} />
                            )) :
                            <p>Вы еще не создавали вакансий</p>
                    }
                </div>
            </div>
        </Container>
    )
}

export default CompanyVacansies