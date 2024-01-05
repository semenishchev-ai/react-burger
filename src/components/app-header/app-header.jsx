import React, { useEffect, useState } from "react";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { Link, useLocation, useNavigate } from "react-router-dom";

function AppHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(0);

    useEffect(() => {
        switch (location.pathname) {
            case '/profile':
                setActive(2);
                return;
            default:
                setActive(0);
        }
    }, [location])

    function onClick() {
        navigate('/');
    }

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={(active ===  0 ? styles.nav_item_active : styles.nav_item) + ' text text_type_main-default'}>
                    <BurgerIcon type={(active ===  0 ? "primary" : "secondary")} />
                    <Link className={styles.item_text} to='/'>
                        Конструктор
                    </Link>
                </div>
                <div className={(active ===  1 ? styles.nav_item_active : styles.nav_item) + ' text text_type_main-default'}>
                    <ListIcon type={(active ===  1 ? "primary" : "secondary")} />
                    <Link className={styles.item_text} to='/'>
                        Лента заказов
                    </Link>
                </div>
                <div className={styles.logo_box} onClick={onClick}>
                    <Logo />
                </div>
                <div className={(active ===  2 ? styles.nav_item_active : styles.nav_item) + ' text text_type_main-default'}>
                    <ProfileIcon type={(active ===  2 ? "primary" : "secondary")} />
                    <Link className={styles.item_text} to='/profile'>
                        Личный кабинет
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;