import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { createVacansy } from "../../api/vacansy"
import { useSelector } from "react-redux"
import { useFormik } from "formik"

import xIcon from "../../assets/profile/xIcon.svg"

import { useActionCompany } from "../../hooks/useActionCompany"
import VacansyCompanyAside from '../../components/vacansy/VacansyCompanyAside/VacansyCompanyAside'
import Container from '../../ui/Container/Container'
import TagsInp from "../../components/companyProfile/tagsInp/TagsInp"
import Input from "../../ui/auth/Input/Input"

import styles from "../../styles/profile/CreateVacansy.module.scss"
import { validationVacansy } from "../../code/validation"

const InputWrap = ({ title, area, err, ...props }) => {
    if (area) {
        return (
            <div>
                <label className={styles.inputWrap}>
                    <h4>{title}</h4>
                    <textarea name="" id="" {...props}></textarea>
                </label>
                {err && <p className="error-text">{err}</p>}
            </div>
        )
    } else {
        return (
            <div>
                <label className={styles.inputWrap}>
                    <h4>{title}</h4>
                    <Input  {...props} />
                </label>
                {err && <p className="error-text">{err}</p>}
            </div>
        )

    }
}

const CreateVacansy = () => {

    const navigate = useNavigate()

    const clientId = localStorage.getItem("clientId")

    const { fetchCompanyById } = useActionCompany()
    const { company } = useSelector(state => state.company)


    const [technologies, setTechnologies] = useState("")

    useEffect(() => {
        fetchCompanyById(clientId)
    }, [])

    const formik = useFormik({
        initialValues: {
            name: '',
            price: "",
            aboutVacansy: "",
            requirements: "",
            additions: "",
            employment: "",
            schedule: "",
            education: ""
        },
        validationSchema: validationVacansy,
        onSubmit: (values) => {
            createVacansy({
                ...values,
                companyId: clientId,
                companyName: company.name,
                technologies: technologies.split(" "),
                who_liked: [],
                response: [],
                status: true
            }).then((res) => {
                console.log(res);
                navigate(`/vacansy/${res.data?.id}`)
            })
        }
    })

    const { requirements, price, name, additions, aboutVacansy, employment, education, schedule } = formik.values
    const { handleChange, handleBlur, handleSubmit, isValid } = formik

    return (
        <Container style={{ paddingRight: "0px" }}>
            <div className={styles.main}>
                <div className={styles.textWrap}>
                    <button onClick={() => navigate(-1)} className={styles.closeBtn}>
                        <img src={xIcon} alt="" />
                    </button>

                    <div className={styles.inpsWrap}>
                        <InputWrap placeholder={"Название вакансии"} title={"Название вакансии"} value={name} name="name" onChange={handleChange} onBlur={handleBlur} err={formik.errors.name} />
                        <InputWrap placeholder={"Оплата"} title={"Оплата"} value={price} onChange={handleChange} name="price" onBlur={handleBlur} err={formik.errors.price} />
                        <TagsInp value={technologies} setValue={setTechnologies} />
                        <InputWrap placeholder={"О вакансии"} title={"О вакансии"} area={true} value={aboutVacansy} onChange={handleChange} onBlur={handleBlur} name="aboutVacansy" err={formik.errors.aboutVacansy} />
                        <InputWrap placeholder={"Требования"} title={"Требования"} area={true} value={requirements} onChange={handleChange} onBlur={handleBlur} name="requirements" err={formik.errors.requirements} />
                        <InputWrap placeholder={"Дополнение"} title={"Дополнение"} area={true} value={additions} onChange={handleChange} onBlur={handleBlur} name="additions" err={formik.errors.additions} />
                        <InputWrap placeholder={"Тип занятости"} title={"Введите тип занятости"} value={employment} onChange={handleChange} onBlur={handleBlur} name="employment" err={formik.errors.employment} />
                        <InputWrap placeholder={"График работы"} title={"Введите график работы"} value={schedule} onChange={handleChange} onBlur={handleBlur} name="schedule" err={formik.errors.schedule} />
                        <InputWrap placeholder={"Образование"} title={"Введите образование"} value={education} onChange={handleChange} onBlur={handleBlur} name="education" err={formik.errors.education} />
                    </div>
                </div>
                <VacansyCompanyAside handleSubmit={formik.handleSubmit} isValid={formik.isValid} companyId={clientId} />
            </div>
        </Container>
    )
}

export default CreateVacansy