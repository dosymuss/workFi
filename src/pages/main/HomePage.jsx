import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import faceIcon from "../../assets/main/face.svg"
import searchIlustrat from "../../assets/main/searchIlustrat.svg"
import DecorateCard from '../../ui/main/DecorateCard/DecorateCard'
import Container from '../../ui/Container/Container'
import VacanseCard from '../../components/main/VacanseCard/VacanseCard'

import "../../styles/homeStyles/homeMainStyles.scss"
import { useActionVacansy } from '../../hooks/useActionVacansy'
import { useSelector } from 'react-redux'
import Spinner from '../../ui/spinner/Spinner'
import { useActionProfile } from '../../hooks/useActionProfile'
import { useActionCompany } from '../../hooks/useActionCompany'

const HomePage = () => {

    const navigate = useNavigate()

    const { fetchAllVacansy, filterVacansiesByTechnologies } = useActionVacansy()
    const { fetchMyProfile } = useActionProfile()
    const { fetchCompanyById } = useActionCompany()

    const { allVacansies, allVacansiesStatus, mainVacansy } = useSelector(state => state.vacansy)
    const { my_profile } = useSelector(state => state.profile)
    const { company } = useSelector(state => state.company)

    const clientId = localStorage.getItem("clientId")
    const isCompany = JSON.parse(localStorage.getItem("isCompany"))


    useEffect(() => {
        const authTrue = localStorage.getItem("authTrue")
        console.log(authTrue);

        if (!authTrue) {
            navigate("/auth/login")
        }


    }, [])

    useEffect(() => {
        fetchAllVacansy()
        if (isCompany) {
            fetchCompanyById(clientId)
        } else {
            fetchMyProfile(clientId)
        }
    }, [])

    useEffect(() => {
        if (isCompany) {
            if (allVacansies.length > 0 && company) {
                const techs = company.technologies || [];
                filterVacansiesByTechnologies(techs);
            }
        } else {
            if (allVacansies.length > 0 && my_profile) {
                const techs = my_profile.technologies || [];
                filterVacansiesByTechnologies(techs);
            }
        }
    }, [allVacansies, my_profile]);

    useEffect(() => {
        console.log(allVacansies);
        console.log(allVacansiesStatus);

    }, [allVacansies, allVacansiesStatus])


    if (!allVacansies?.length > 0) {
        return (
            <div className="spinner-wrap">
                <Spinner />
            </div>
        )
    } else {
        return (
            <Container>
                <div className="home-page-main">
                    <div className="decorate-wrap">
                        <DecorateCard path={"/client-profile"} img={faceIcon} position={"bottom"} text={"Оформите ваш профиль, чтоб компании оценили ваши успехи"} />
                        <DecorateCard path={"/search"} img={searchIlustrat} position={"top"} text={"Найдите работу мечты"} />
                    </div>
                    <div className="vacanse-wrap">
                        {
                            mainVacansy?.length > 0 ?
                                mainVacansy.map((item) => (
                                    <VacanseCard vacansy={item} key={item?.id} />
                                ))
                                : null
                        }
                    </div>
                </div>
            </Container>
        )
    }
}

export default HomePage