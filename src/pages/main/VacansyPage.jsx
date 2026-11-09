import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Container from '../../ui/Container/Container'
import VacansyCompanyAside from '../../components/vacansy/VacansyCompanyAside/VacansyCompanyAside'
import Spinner from '../../ui/spinner/Spinner'
import { useActionVacansy } from '../../hooks/useActionVacansy'
import { deleteVacansy } from '../../api/vacansy'

import trashIcon from "../../assets/profile/trash.svg"
import editIcon from "../../assets/profile/editImageIcon.svg"


import "../../styles/homeStyles/homeMainStyles.scss"
import styles from "../../styles/vacansy/VacansyPage.module.scss"

const Tasks = ({ text }) => {
    return (
        <span className={styles.tags}>{text}</span>
    )
}

const ButtonWrap = ({ vacansyId }) => {

    const navigate = useNavigate()



    return (
        <div className={styles.buttonWrap}>
            <button onClick={() => navigate(`/edit-vacansy/${vacansyId}`)}>
                <img src={editIcon} alt="" />
            </button>
            <button onClick={() => {
                deleteVacansy(vacansyId).then((res) => {
                    if (res.status === 200) {
                        navigate("/")
                    }
                })
            }}>
                <img src={trashIcon} alt="" />
            </button>
        </div>
    )
}

const VacansyPage = () => {

    const { id } = useParams()

    const [isCompany, setIsCompany] = useState(false)


    const { fetchVacansyById } = useActionVacansy()
    const { vacansy, vacansyStatus } = useSelector(state => state.vacansy)


    useEffect(() => {
        fetchVacansyById(id)
    }, [])


    useEffect(() => {
        if (!vacansy) return;
        const clientId = localStorage.getItem("clientId");
        if (vacansy?.companyId === clientId) {
            setIsCompany(true);
        } else {
            setIsCompany(false);
        }
    }, [vacansy]);



    console.log(vacansy);


    if (vacansyStatus === "pending") {
        return (
            <div className='spinner-wrap'>
                <Spinner />
            </div>
        )
    } else {
        return (
            <Container style={{ paddingRight: "0px" }}>
                <div className={styles.main}>
                {
                    isCompany &&
                    <ButtonWrap vacansyId={vacansy?.id} />
                }
                    <div className={styles.textWrap}>
                        <div>
                            <h3 className={styles.vacansyTitle}>{vacansy?.name}</h3>
                            <div className={styles.priceAndTags}>
                                <p>{vacansy?.price} сом</p>
                                <div>
                                    {vacansy?.technologies?.map((item) => (
                                        <Tasks text={item} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className={styles.vacansyTextWrap}>
                            <div>
                                <h4>О вакансии:</h4>
                                <p>{vacansy?.aboutVacansy}</p>
                            </div>
                            <div>
                                <h4>Требования:</h4>
                                <p>{vacansy?.requirements}</p>
                            </div>
                            <div>
                                <h4>Дополнения:</h4>
                                <p>{vacansy?.additions}</p>
                            </div>
                        </div>


                    </div>
                    <VacansyCompanyAside companyId={vacansy?.companyId} vacansy={vacansy} />


                </div>
            </Container>
        )
    }

}

export default VacansyPage