import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-section.module.css"
import React, { useCallback, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../../services/actions/auth-actions";

function LoginSection() {
    const [form, setValue] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = useCallback(
        (e) => {
            e.preventDefault();
            dispatch(loginRequest(form));
        }, [form]
    )

    return (
        <section className={styles.section}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.input + " text text_type_main-medium"}>
                    Вход
                </h1>
                <div className={styles.input}>
                    <EmailInput value={form.email} name={'email'} onChange={onChange}/>
                </div>
                <div className={styles.input}>
                    <PasswordInput value={form.password} name={'password'} onChange={onChange}/>
                </div>
                <Button type="primary" htmlType="submit">
                    Войти
                </Button>
            </form>
            <div className={styles.footer + " text text_type_main-default"}>
                <p className={styles.text}>
                    Вы — новый пользователь?
                </p>
                <Link to="/register" className={styles.link}>
                    Зарегистрироваться
                </Link>
            </div>
            <div className={styles.footer + " text text_type_main-default"}>
                <p className={styles.text}>
                    Забыли пароль?
                </p>
                <Link to="/forgot-password" className={styles.link}>
                    Восстановить пароль
                </Link>
            </div>
        </section>
    )
}

export default LoginSection;