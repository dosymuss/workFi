import { Link, useLocation, useNavigate } from 'react-router-dom'

import SearchIcon from '../../icons/NavIcons/SearchIcon'
import SaveIcon from '../../icons/NavIcons/SaveIcon'
import LikeIcon from '../../icons/NavIcons/LikeIcon'

import styles from "./Navbar.module.scss"
import ChatsIcon from '../../icons/NavIcons/ChatsIcon'
import ProfileIcon from '../../icons/NavIcons/ProfileIcon'
import Logout from '../../icons/NavIcons/Logout'

const Navbar = () => {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const isCompany = JSON.parse(localStorage.getItem("isCompany"))

    const handleLogout = () => {
        localStorage.removeItem("authTrue")
        localStorage.removeItem("isCompany")
        navigate("/auth/login")
    }

    return (
        <div className={styles.navbar}>
            <Link to={"/search"} className={pathname === "/search" ? styles.linkActive : styles.link} style={{ paddingRight: "10px" }}>
                <SearchIcon />
                Поиск
            </Link>
            <Link to={isCompany ? "/company-profile" : "/client-profile"} className={pathname === "/client-profile" ? styles.linkActive : styles.link}>
                <ProfileIcon />
            </Link>
            {
                !isCompany &&
                <Link to={"/liked"} className={pathname === "/liked" ? styles.linkActive : styles.link}>
                    <LikeIcon />
                </Link>
            }
            <Link to={isCompany ? "/company-vacansy" : "/vacansy-history"} className={styles.link}>
                <ChatsIcon />
            </Link>
            <button className={styles.link} onClick={handleLogout}>
                <Logout />
            </button>
        </div>
    )
}

export default Navbar