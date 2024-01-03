import { EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile-section.module.css"

function ProfileSection() {
    const [form, setValue] = useState({});
    const [isChanged, setChanged] = useState(false);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setChanged(true);
        console.log(form);
    };

    const onExit = () => {
        return
    }

    return (
        <section className={styles.section}>
            <nav className={styles.nav}>
                <NavLink className={styles.link + " text text_type_main-medium"} to={{ pathname: '/profile' }}>
                    Профиль
                </NavLink>
                <NavLink className={styles.inactive_link + " text text_type_main-medium"} to={{ pathname: '/profile' }}>
                    История заказов
                </NavLink>
                <NavLink  className={styles.inactive_link + " text text_type_main-medium"} to={{ pathname: '/login' }} onClick={onExit}>
                    Выход
                </NavLink>
                <p className={styles.text+ " text text_type_main-default"}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <form className={styles.form}>
                <div className={styles.input}>
                    <Input value={form.name} placeholder={'Имя'} name={'name'} onChange={onChange} icon="EditIcon"/>
                </div>
                <div className={styles.input}>
                    <EmailInput value={form.email} name={'email'} onChange={onChange} isIcon={true}/>
                </div>
                <div className={styles.input}>
                    <PasswordInput value={form.password} name={'password'} onChange={onChange} icon="EditIcon"/>
                </div>
            </form>
        </section>
    )
}

export default ProfileSection;