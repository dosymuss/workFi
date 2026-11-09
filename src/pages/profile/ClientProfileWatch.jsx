import { useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import ProfileImage from "../../components/profile/profileImage/ProfileImage"
import ProfileSkillsBlock from "../../components/profile/profileSkillsBlock/ProfileSkillsBlock"
import Container from "../../ui/Container/Container"
import DocumInpWatch from "../../components/profile/documInpWatch/DocumInpWatch"
import { getUserById } from "../../api/auth"
import ProfileSkillsWatch from "../../components/profile/profileSkillsWatch/ProfileSkillsWatch"
import { useActionVacansy } from "../../hooks/useActionVacansy"

import markIcon from "../../assets/profile/mark.svg"
import xIcon from "../../assets/profile/xWhite.svg"

import styles from "../../styles/profile/ClientProfileWatch.module.scss"
import { useSelector } from "react-redux"


const ApproveBtns = ({ clientId, vacansy, status, setStatus }) => {


    const { patchVacansy } = useActionVacansy()

    const ourResponse = vacansy?.response?.find((item) => item?.userId === clientId)


    useEffect(() => {
        if (!status || !vacansy?.response || !clientId) return;

        // Удаляем все отклики от этого пользователя
        const filteredResponses = vacansy.response.filter(
            item => item.userId !== clientId
        );

        // Добавляем один отклик с обновлённым статусом
        const updatedResponse = {
            userId: clientId,
            text: ourResponse?.text || "", // чтобы не потерять текст, если был
            status,
        };

        const updatedResponses = [...filteredResponses, updatedResponse];

        try {
            patchVacansy({
                id: vacansy.id,
                data: { response: updatedResponses }
            });
        } catch (err) {
            console.error("Ошибка обновления статуса:", err);
        }
    }, [status, vacansy]);



    return (
        <div className={styles.approveBtns}>
            <button onClick={() => setStatus("success")}>
                <img src={markIcon} alt="" />
                <p>Собеседование</p>
            </button>
            <button onClick={() => setStatus("rejected")}>
                <img src={xIcon} alt="" />
                <p>Отказанно</p>
            </button>
        </div>
    )
}


const ClientProfileWatch = () => {



    const [data, setData] = useState({})
    const [status, setStatus] = useState("")

    const { id } = useParams()
    const { search } = useLocation();

    const vacansyId = new URLSearchParams(search).get("vacansyId");

    const { fetchVacansyById } = useActionVacansy()

    const { vacansy } = useSelector(state => state.vacansy)

    useEffect(() => {
        getUserById(id).then((res) => {
            setData(res.data)
        })
        fetchVacansyById(vacansyId)
    }, [id])

    useEffect(() => {
        const ourResponse = vacansy?.response?.find((item) => item?.userId === id);
        if (ourResponse) {
            setStatus(ourResponse.status);
        }
    }, [vacansy, id]);


    return (
        <Container>
            <ApproveBtns clientId={id} vacansy={vacansy} status={status} setStatus={setStatus} />
            {status ?
                status === "success" ? (
                    <p style={{ color: "var(--acGreen)" }}>Вы приглашены на собеседование</p>
                ) : (
                    <p style={{ color: "var(--red)" }}>К сожалению, вам отказано в собеседовании</p>
                ) : null
            }

            <div className={styles.main}>
                <div className={styles.infoWrap}>

                    <h3>{data?.name}</h3>
                    <h4>{data?.date?.join(".")}</h4>

                    <div>
                        <p>Tell us about yourself</p>
                        <span>{data?.about_me}</span>
                    </div>

                    <DocumInpWatch docum={data?.documents} />
                </div>
                <div className={styles.imageWrap}>
                    <img src={data?.image} alt="" />
                    <ProfileSkillsWatch skills={data?.technologies} />
                </div>
            </div>
        </Container>
    )
}

export default ClientProfileWatch