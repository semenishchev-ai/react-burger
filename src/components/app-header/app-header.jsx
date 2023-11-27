import React from "react";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'

function AppHeader() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.nav_item + ' text text_type_main-default'}>
                    <BurgerIcon type="primary" />
                    <a className={styles.item_text} href='/'>
                        Конструктор
                    </a>
                </div>
                <div className={styles.nav_item + ' text text_type_main-default'}>
                    <ListIcon type="secondary" />
                    <a className={styles.item_text} href='/'>
                        Лента заказов
                    </a>
                </div>
                <div className={styles.logo_box}>
                    <Logo />
                </div>
                <div className={styles.nav_item + ' text text_type_main-default'}>
                    <ProfileIcon type="secondary" />
                    <a className={styles.item_text} href='/'>
                        Личный кабинет
                    </a>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader;