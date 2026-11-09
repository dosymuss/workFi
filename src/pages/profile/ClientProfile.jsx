import { useEffect, useState } from "react";
import { useActionProfile } from "../../hooks/useActionProfile";

import Container from "../../ui/Container/Container"
import ProfileInp from "../../ui/profile/profileInp/ProfileInp"
import ProfileAdressInp from "../../ui/profile/profileAdressInp/ProfileAdressInp"
import DocumInp from "../../components/profile/documInp/DocumInp";
import ProfileImage from "../../components/profile/profileImage/ProfileImage";
import ProfileSkillsBlock from "../../components/profile/profileSkillsBlock/ProfileSkillsBlock";

import styles from "../../styles/profile/ClientProfile.module.scss"
import { useSelector } from "react-redux";

const ClientProfile = () => {
    const { fetchMyProfile, fetchPatchMyProfile, setNewTech } = useActionProfile();
    const { my_profile } = useSelector(state => state.profile);

    const id = localStorage.getItem("clientId")

    const [name, setName] = useState("");
    const [surename, setSurename] = useState("");
    const [about, setAbout] = useState("");
    const [date, setDate] = useState(["", "", ""])
    const [image, setImage] = useState("")
    const [docum, setDocum] = useState([])

    useEffect(() => {
        fetchMyProfile(id);
    }, []);

    useEffect(() => {
        if (my_profile?.name) {
            setName(my_profile.name);
        }
        if (my_profile?.surename) {
            setSurename(my_profile.surename);
        }
        if (my_profile?.date) {
            setDate(my_profile.date);
        }
        if (my_profile?.about_me) {
            setAbout(my_profile.about_me);
        }
        if (my_profile?.image) {
            setImage(my_profile.image);
        }
        if (my_profile?.documents) {
            setDocum(my_profile.documents);
        }
    }, [my_profile]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        fetchPatchMyProfile({
            id: id,
            data: {
                name: e.target.value
            }
        });
    };
    const handleSurenameChange = (e) => {
        setSurename(e.target.value);
        fetchPatchMyProfile({
            id: id,
            data: {
                surename: e.target.value
            }
        });
    };
    const handleAboutChange = (e) => {
        setAbout(e.target.value);
        fetchPatchMyProfile({
            id: id,
            data: {
                about_me: e.target.value
            }
        });
    };

    const handleTechChange = (skills) => {

        fetchPatchMyProfile({
            id: id,
            data: {
                technologies: skills
            }
        });
    };

    const deleteTech = (skills, deleteTech) => {

        const newData = skills?.filter((item) => item !== deleteTech)

        fetchPatchMyProfile({
            id: id,
            data: {
                technologies: newData
            }
        });
        setNewTech(newData)
    }

    const handleChangeImage = (image) => {
        fetchPatchMyProfile({
            id: id,
            data: {
                image: image
            }
        });
    }

    useEffect(() => {
        fetchPatchMyProfile({
            id: id,
            data: {
                date: date
            }
        });
    }, [date])

    useEffect(() => {
        fetchPatchMyProfile({
            id: id,
            data: {
                documents: docum
            }
        });
    }, [docum])



    if (!my_profile) return null;

    if (my_profile) {
        return (
            <Container>
                <div className={styles.main}>

                    <div className={styles.inpWrap}>
                        <h3 className={styles.title}>My profile</h3>
                        <ProfileInp value={name} onChange={handleNameChange} text={"Your name"} placeholder={"Name"} />
                        <ProfileInp value={surename} onChange={handleSurenameChange} text={"You second name"} placeholder={"Second name"} />
                        <ProfileAdressInp date={date} setDate={setDate} title={"Your birthday"} />
                        <ProfileInp value={about} onChange={handleAboutChange} text={"Tell us about yourself"} placeholder={"Yourself information"} textarea={true} />
                        <DocumInp docum={docum} setDocum={setDocum} />
                    </div>
                    <div className={styles.imageWrap}>
                        <ProfileImage handleChangeImage={handleChangeImage} image={image} setImage={setImage} url={my_profile?.image} />
                        <ProfileSkillsBlock deleteTech={deleteTech} handleTechChange={handleTechChange} skills={my_profile?.technologies} />
                    </div>
                </div>


            </Container>
        )
    }

}

export default ClientProfile