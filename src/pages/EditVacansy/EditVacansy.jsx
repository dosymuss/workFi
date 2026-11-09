import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { createVacansy, editVacansy } from "../../api/vacansy"
import { useSelector } from "react-redux"
import { useFormik } from "formik"

import xIcon from "../../assets/profile/xIcon.svg"

import VacansyCompanyAside from '../../components/vacansy/VacansyCompanyAside/VacansyCompanyAside'
import Container from '../../ui/Container/Container'
import TagsInp from "../../components/companyProfile/tagsInp/TagsInp"
import Input from "../../ui/auth/Input/Input"
import { validationVacansy } from "../../code/validation"
import { useActionVacansy } from "../../hooks/useActionVacansy"

import styles from "../../styles/profile/CreateVacansy.module.scss"

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

const EditVacansy = () => {

    const navigate = useNavigate()

    const { id } = useParams()

    const clientId = localStorage.getItem("clientId")

    const { fetchVacansyById } = useActionVacansy()
    const { vacansy } = useSelector(state => state.vacansy)


    const [technologies, setTechnologies] = useState([])

    useEffect(() => {
        fetchVacansyById(id)
    }, [id])

    useEffect(() => {
        if (vacansy?.technologies) {
            setTechnologies(vacansy.technologies.join(" "));
        }
    }, [vacansy]);

    const formik = useFormik({
        initialValues: {
            name: vacansy?.name || "",
            price: vacansy?.price || "",
            aboutVacansy: vacansy?.aboutVacansy || "",
            requirements: vacansy?.requirements || "",
            additions: vacansy?.additions || "",
            employment: vacansy?.employment || "",
            schedule: vacansy?.schedule || "",
            education: vacansy?.education || ""
        },
        enableReinitialize: true,
        validationSchema: validationVacansy,
        onSubmit: (values) => {
            editVacansy(id, {
                ...vacansy,
                ...values
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

export default EditVacansy