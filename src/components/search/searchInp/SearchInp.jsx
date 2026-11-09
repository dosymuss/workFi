import { useEffect, useState } from "react"
import styles from "./SearchInp.module.scss"
import { fetchSearchVacansy } from "../../../store/vacansySlice"
import { useActionVacansy } from "../../../hooks/useActionVacansy"

const SearchInp = () => {

  const [value, setValue] = useState('')

  const { fetchSearchVacansy, setSearchVacansy } = useActionVacansy()

  const handleSearch = () => {
    fetchSearchVacansy(value)
  }

  const handleChange = (e) => {
    if (e.target.value) {
      setValue(e.target.value)
    } else {
      setSearchVacansy()
      setValue("")
    }
  }



  return (
    <div className={styles.searchInpMain}>
      <input value={value} onChange={(e) => handleChange(e)} type="text" placeholder="Search" />
      <button onClick={handleSearch}>Найти</button>
    </div>
  )
}

export default SearchInp