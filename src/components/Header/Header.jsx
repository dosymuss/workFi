import React from 'react'
import Logo from '../../ui/logo/Logo'
import styles from './Header.module.scss';
import Container from '../../ui/Container/Container';
import Navbar from '../../ui/Navigation/Navbar';

const Header = () => {
    return (
        <header className={styles.main}>
            <Container>
                <div className={styles.content}>
                    <Logo />
                    <Navbar />
                </div>
            </Container>
        </header>
    )
}

export default Header