import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./login-section.module.css"
import React, { FormEvent, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { loginRequest } from "../../services/actions/auth-actions";
import { useDispatch } from "../../hooks/useDispatch";

function LoginSection() {
    const [form, setValue] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            dispatch(loginRequest(form));
        }, [form, dispatch]
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