import { useEffect } from 'react'
import { useActionVacansy } from '../../hooks/useActionVacansy'
import DecorateCard from '../../ui/main/DecorateCard/DecorateCard'

import timeIlustrat from "../../assets/liked/timeIlustrat.svg"
import bookIlustrat from "../../assets/liked/bookIlustrat.svg"
import Container from '../../ui/Container/Container'
import VacanseCard from '../../components/main/VacanseCard/VacanseCard'

import "../../styles/homeStyles/homeMainStyles.scss"
import { useSelector } from 'react-redux'
import Spinner from '../../ui/spinner/Spinner'

const LikePage = () => {

    const clientId = localStorage.getItem("clientId")

    const { fetchAllVacansy } = useActionVacansy()
    const likedVacansies = useSelector(state => state.vacansy.likedVacansies)
    useEffect(() => {
        if (clientId) {
            fetchAllVacansy()
        }
    }, [clientId])

    return (
        <Container>
            <div className="home-page-main">
                <div className="decorate-wrap">
                    <DecorateCard path={"/liked"} img={timeIlustrat} position={"top"} text={"Сохраняйте интересные вакансии на потом"} imageStyle={{ width: "90px", bottom: "10px" }} />
                    <DecorateCard path={"/client-profile"} img={bookIlustrat} position={"bottom"} text={"Обнови резюме и возвращайся к вакансиям"} imageStyle={{ width: "130px" }} />
                </div>
                <div className="vacanse-wrap">
                    {
                        likedVacansies && likedVacansies.length > 0 ?
                            likedVacansies.map((item) => (
                                <VacanseCard vacansy={item} />
                            )
                            )
                            :
                            <Spinner />
                    }
                </div>
            </div>
        </Container>
    )
}

export default LikePage