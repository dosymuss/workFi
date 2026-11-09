import { useNavigate } from "react-router-dom"
import { useActionCompany } from "../../hooks/useActionCompany"
import { useSelector } from "react-redux"

import CompanyComments from "../../components/companyProfile/companyComments/CompanyComments"
import Container from "../../ui/Container/Container"
import Input from "../../ui/auth/Input/Input"
import BirthdayInput from "../../ui/profile/profileAdressInp/ProfileAdressInp"

import xIcon from "../../assets/profile/xIcon.svg"
import imageIcon from "../../assets/profile/imageSceleton.svg"

import styles from "./EditProfile.module.scss"
import { useEffect, useState } from "react"


const CompanyImageBlock = ({ image, setImage }) => {
    return (
        <div className={styles.companyImageBlock}>
            {
                image?.length > 0 ?
                    <img className={styles.mainImg} src={image} alt="" />
                    :
                    <div className={styles.companySceletonImage}>
                        <img src={imageIcon} alt="" />
                    </div>
            }
            <div className={styles.inpWrap}>
                <h5>Company image</h5>
                <Input placeholder={"Image url"} value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
        </div>
    )
}

const InputWrap = ({ title, area, ...props }) => {
    if (area) {
        return (
            <label className={styles.inputWrap}>
                <h4>{title}</h4>
                <textarea name="" id="" {...props}></textarea>
            </label>
        )
    } else {
        return (
            <label className={styles.inputWrap}>
                <h4>{title}</h4>
                <Input  {...props} />
            </label>
        )

    }
}


const EditProfile = () => {

    const navigate = useNavigate()

    const clientId = localStorage.getItem("clientId")

    const { fetchCompanyById, patchCompany } = useActionCompany()
    const { company } = useSelector(state => state.company)


    useEffect(() => {
        fetchCompanyById(clientId)
    }, [])

    const [companyName, setCompanyName] = useState(company?.name ? company.name : "")
    const [history, setHistory] = useState(company?.history ? company.history : "")
    const [date, setDate] = useState(company?.date ? company?.date : ["00", "00", "0000"])
    const [image, setImage] = useState("")

    useEffect(() => {
        if (company?.date) {
            setDate(company.date)
        }
        if (company?.name) {
            setCompanyName(company.name)
        }
        if (company?.history) {
            setHistory(company.history)
        }
        if (company?.image) {
            setImage(company.image)
        }
    }, [company])

    useEffect(() => {
        patchCompany({
            id: clientId,
            data: {
                date: date,
                name: companyName,
                history: history,
                image: image
            }
        })
    }, [date, image, history, companyName])

    return (
        <Container style={{ paddingRight: "0px" }}>
            <div className={styles.main}>
                <div className={styles.contentBlock}>
                    <button onClick={() => navigate(-1)} className={styles.closeBtn}>
                        <img src={xIcon} alt="" />
                    </button>

                    <div className={styles.inpWraps}>
                        <CompanyImageBlock image={image} setImage={setImage} />
                        <InputWrap title={"Company name"} placeholder="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                        <BirthdayInput date={date} setDate={setDate} title={"Started in"} titleStyle={{ fontSize: "24px" }} />
                        <InputWrap title={"Company history"} area={true} placeholder="Company history" value={history} onChange={(e) => setHistory(e.target.value)} />
                    </div>

                </div>
                <div>
                    <CompanyComments />
                </div>

            </div>
        </Container>
    )
}

export default EditProfile