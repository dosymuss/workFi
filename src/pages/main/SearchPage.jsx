import { useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react"

import VacanseCard from "../../components/main/VacanseCard/VacanseCard"
import SearchInp from "../../components/search/searchInp/SearchInp"
import Container from "../../ui/Container/Container"
import SearchCheckbox from "../../ui/search/searchCheckbox/SearchCheckbox"
import { useActionVacansy } from "../../hooks/useActionVacansy"

import styles from "../../styles/search/searchPage.module.scss"

const SearchPage = () => {

  const { fetchAllVacansy } = useActionVacansy()
  const { allVacansies, allVacansiesStatus, searchVacansy } = useSelector(state => state.vacansy)

  const [filters, setFilters] = useState({
    workTime: [],
    employmentType: [],
    education: []
  })


  useEffect(() => {
    fetchAllVacansy()
  }, [])

  const filteredVacancies = useMemo(() => {
    return allVacansies.filter(vac => {
      const matchWorkTime = filters.workTime.length === 0 || filters.workTime.includes(vac.schedule)
      const matchEmployment = filters.employmentType.length === 0 || filters.employmentType.includes(vac.employment)
      const matchEducation = filters.education.length === 0 || filters.education.includes(vac.education)

      return matchWorkTime && matchEmployment && matchEducation
    })
  }, [allVacansies, filters])

  const finalVacancies = searchVacansy?.length ? searchVacansy : filteredVacancies



  return (
    <Container>
      <SearchInp />
      <div className={styles.searchContent}>
        <div className={styles.vacanseFilterWrap}>
          <h4>Найдено вакансий {(searchVacansy?.length ? searchVacansy?.length : finalVacancies?.length)}</h4>
          <div className={styles.groupWrap}>

            <SearchCheckbox
              title={"Рабочий график"}
              name={"workTime"}
              values={["Полный день", "Сменный график", "Гибкий график", "Удалённая работа", "Вахтовый метод"]}
              onChange={(selected) => setFilters(prev => ({ ...prev, workTime: selected }))}
            />

            <SearchCheckbox
              title={"Тип занятости"}
              name={"employmentType"}
              values={["Полная занятость", "Частичная занятость", "Проектная работа", "Стажировка", "Волонтёрство"]}
              onChange={(selected) => setFilters(prev => ({ ...prev, employmentType: selected }))}
            />

            <SearchCheckbox
              title={"Образование"}
              name={"education"}
              values={["высшее", "среднее", "необязательно"]}
              onChange={(selected) => setFilters(prev => ({ ...prev, education: selected }))}
            />

          </div>
        </div>
        <div className={styles.vacanseCardWrap}>

          {finalVacancies && finalVacancies?.length > 0 ?
            finalVacancies?.map(item => (
              <VacanseCard key={item.id} vacansy={item} />
            )) :
            <p className={styles.nothingText}>К сожалению, ничего не найдено</p>
          }

        </div>
      </div>

    </Container>
  )
}

export default SearchPage