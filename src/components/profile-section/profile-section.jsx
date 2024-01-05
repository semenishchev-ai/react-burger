import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./profile-section.module.css"
import { useDispatch, useSelector } from "react-redux";
import { logoutRequest, patchUserInfo } from "../../services/actions/auth-actions";

function ProfileSection() {
    const [form, setValue] = useState({});
    const [isChanged, setChanged] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.authReducer.user);
    const navigate = useNavigate();

    useEffect(() => {
        setValue(user);
      }, []);

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setChanged(true);
        console.log(form);
    };

    const onExit = () => {
        dispatch(logoutRequest(form));
    }

    const onCancel = (e) => {
        setValue(user);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (isChanged) {
            dispatch(patchUserInfo(form));
        }
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
                <a  className={styles.inactive_link + " text text_type_main-medium"} onClick={onExit}>
                    Выход
                </a>
                <p className={styles.text+ " text text_type_main-default"}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <form className={styles.form} onSubmit={onSubmit}>
                <div className={styles.input}>
                    <Input value={form.name || ''} placeholder={'Имя'} name={'name'} onChange={onChange} icon="EditIcon"/>
                </div>
                <div className={styles.input}>
                    <EmailInput value={form.email || ''} name={'email'} onChange={onChange} isIcon={true}/>
                </div>
                <div className={styles.input}>
                    <PasswordInput value={form.password || ''} name={'password'} onChange={onChange} icon="EditIcon"/>
                </div>
                <div className={styles.buttons}>
                    <Button type="secondary" htmlType="button" onClick={onCancel}>
                        Отмена
                    </Button>
                    <Button type="primary" htmlType="submit">
                        Сохранить
                    </Button>
                </div>
            </form>
        </section>
    )
}

export default ProfileSection;