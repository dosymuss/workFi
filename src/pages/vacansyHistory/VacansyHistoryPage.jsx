import { useSelector } from 'react-redux'
import HistoryUserStatus from '../../components/history/historyUserStatus/HistoryUserStatus'
import { useActionVacansy } from '../../hooks/useActionVacansy'
import Container from '../../ui/Container/Container'

import styles from "./VacansyHistoryPage.module.scss"
import Spinner from '../../ui/spinner/Spinner'
import { useEffect } from 'react'


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

const VacansyHistoryPage = () => {

  const clientId = localStorage.getItem("clientId")

  const { fetchAllVacansy } = useActionVacansy()

  const { my_vacansyis } = useSelector(state => state.vacansy)

  useEffect(() => {
    if (clientId) {
      fetchAllVacansy()
    }
  }, [clientId])


  return (
    <Container>
      <div className={styles.main}>
        <h2 className={styles.title}>Vacancies</h2>
        <h3 className={styles.titleSmall}>Your vacancies</h3>
        <VacansyTableTitles />
        <div className={styles.userStatusWrap}>
          {
            my_vacansyis && my_vacansyis?.length > 0 ?
              my_vacansyis?.map((item) => (
                <HistoryUserStatus vacansy={item} />
              ))
              :
              <Spinner />
          }
        </div>

      </div>
    </Container>
  )
}

export default VacansyHistoryPage