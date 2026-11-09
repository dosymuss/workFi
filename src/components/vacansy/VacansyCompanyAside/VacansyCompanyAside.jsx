import { useEffect, useState } from "react";

import likeIcon from "../../../assets/vacansy/likeIcon.svg"
import VacansyLetterModal from "../VacansyLetterModal/VacansyLetterModal";

import styles from './VacansyCompanyAside.module.scss';
import { useLocation } from "react-router-dom";
import { useActionCompany } from "../../../hooks/useActionCompany";
import { useSelector } from "react-redux";
import CompanyCommentsModal from "../companyCommentsModal/CompanyCommentsModal";


const CompanyTitleImage = ({ company }) => {
    return (
        <div className={styles.companyTitleImageWrap}>
            <div>
                <img className={styles.companyImage} src={company?.image} alt="" />
                <h3>{company?.name}</h3>
            </div>
            <button className={styles.likeBtn}>
                <img src={likeIcon} alt="" />
            </button>
        </div>
    )
}

const VacansyCompanyAside = ({ companyId, handleSubmit = null, isValid = null, vacansy }) => {

    const [open, setOpen] = useState(false)
    const [comment, setComment] = useState(false)

    const { pathname } = useLocation()

    const { fetchCompanyById } = useActionCompany()
    const { company } = useSelector(state => state.company)

    const isCompany = JSON.parse(localStorage.getItem("isCompany"))

    useEffect(() => {
        fetchCompanyById(companyId)
    }, [])


    console.log(company);


    return (
        <>
            <div style={pathname === "/create-vacansy" ? { justifyContent: 'flex-start', gap: "20px" } : null} className={styles.asideMain}>
                <CompanyTitleImage company={company} />

                <div className={styles.historyWrap}>
                    <h4>История компании:</h4>
                    <p>{company?.history}</p>
                </div>
                {
                    pathname === "/create-vacansy" || pathname.startsWith("/edit-vacansy/")
                        ? (
                            <button onClick={handleSubmit} disabled={!isValid} className={styles.subBtn}>
                                {
                                    pathname === "/create-vacansy" ? "Создать" : "Изменить"
                                }
                            </button>
                        ) : (
                            !isCompany && (
                                <div>
                                    <button className={styles.commentBtn} onClick={() => setComment(true)}>
                                        Написать
                                    </button>
                                    <button className={styles.subBtn} onClick={() => setOpen(true)}>
                                        Откликнуться
                                    </button>
                                </div>
                            )
                        )
                }



            </div>
            {
                pathname !== "/create-vacansy" &&
                <VacansyLetterModal open={open} onClose={() => setOpen(false)} vacansy={vacansy} />
            }
            {
                pathname !== "/create-vacansy" &&
                <CompanyCommentsModal open={comment} onClose={() => setComment(false)} companyId={companyId} comments={company?.comments} />
            }
        </>
    )
}

export default VacansyCompanyAside