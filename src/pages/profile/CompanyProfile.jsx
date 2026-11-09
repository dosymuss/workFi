import { useNavigate } from "react-router-dom"

import plusIcon from "../../assets/profile/plusIcon.svg"
import editIcon from "../../assets/profile/editImageIcon.svg"

import CompanyNameLike from "../../components/companyProfile/companyNameLike/CompanyNameLike"
import Container from "../../ui/Container/Container"
import CompanyComments from "../../components/companyProfile/companyComments/CompanyComments"

import styles from "../../styles/profile/CompanyProfile.module.scss"
import { useActionCompany } from "../../hooks/useActionCompany"
import { useEffect } from "react"
import { useSelector } from "react-redux"


const ButtonWrap = () => {

  const navigate = useNavigate()

  return (
    <div className={styles.buttonWrap}>
      <button onClick={() => navigate("/edit-profile")}>
        <img src={editIcon} alt="" />
      </button>
      <button onClick={() => navigate("/create-vacansy")}>
        <img src={plusIcon} alt="" />
      </button>
    </div>
  )
}


const CompanyProfile = () => {

  const clientId = localStorage.getItem("clientId")

  const { fetchCompanyById } = useActionCompany()
  const { company } = useSelector(state => state.company)


  useEffect(() => {
    fetchCompanyById(clientId)
  }, [])
  


  return (
    <Container style={{ paddingRight: "0px" }}>
      <div className={styles.main}>
        <div className={styles.contentBlock}>
          <ButtonWrap />
          <CompanyNameLike company={company} />
          <div className={styles.historyBlock}>
            <h4>Company history:</h4>
            <p>{company?.history ? company.history : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorem veritatis adipisci in vel natus illum blanditiis cum. Illum rem suscipit aliquam, omnis quasi repudiandae eveniet error accusantium exercitationem autem adipisci."}</p>
          </div>
        </div>
        <div>
          <CompanyComments company={company} companyId={clientId} />
        </div>
      </div>
    </Container>
  )
}

export default CompanyProfile