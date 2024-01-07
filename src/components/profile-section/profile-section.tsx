import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./profile-section.module.css"
import { logoutRequest, patchUserInfo } from "../../services/actions/auth-actions";
import { useDispatch } from "../../hooks/useDispatch";
import { useSelector } from "../../hooks/useSelector";
import { TUserData } from "../../utils/types";

function ProfileSection() {
    const [form, setValue] = useState<TUserData>({name: '', password: '', email: ''});
    const [isChanged, setChanged] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector((store) => store.authReducer.user);

    useEffect(() => {
        setValue(user);
      }, [user]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
        setChanged(true);
    };

    const onExit = () => {
        dispatch(logoutRequest());
    }

    const onCancel = (e: SyntheticEvent<Element, Event>) => {
        setValue(user);
    }

    const onSubmit = (e: FormEvent) => {
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
                <a  className={styles.inactive_link + " text text_type_main-medium"} onClick={onExit} href='/'>
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