import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useSelector } from "react-redux"

import { useActionCompany } from "../../hooks/useActionCompany"
import CompanyNameLike from "../../components/companyProfile/companyNameLike/CompanyNameLike"
import Container from "../../ui/Container/Container"
import CompanyComments from "../../components/companyProfile/companyComments/CompanyComments"

import styles from "../../styles/profile/CompanyProfile.module.scss"



const CompanyProfileWatch = () => {

    const { id } = useParams()

    const { fetchCompanyById } = useActionCompany()
    const { company } = useSelector(state => state.company)
    const clientId = localStorage.getItem("clientId")


    useEffect(() => {
        fetchCompanyById(id)
    }, [])



    return (
        <Container style={{ paddingRight: "0px" }}>
            <div className={styles.main}>
                <div className={styles.contentBlock}>
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

export default CompanyProfileWatch