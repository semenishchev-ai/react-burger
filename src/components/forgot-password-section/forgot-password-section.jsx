import React, { useCallback, useState } from "react";
import styles from "./forgot-password-section.module.css"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { forgotPassword } from "../../utils/api";

function ForgotPasswordSection() {
    const [form, setValue] = useState({ email: '' });
    const navigate = useNavigate();
    const location = useLocation();

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const resetRequest = useCallback(
        (e) => {
            e.preventDefault();
            forgotPassword("/password-reset", form.email)

            navigate('/reset-password', {replace: true, state: {from: location}});
        }, [form]
    )

    return (
        <section className={styles.section}>
            <form className={styles.form} onSubmit={resetRequest}>
                <h1 className={styles.input + " text text_type_main-medium"}>
                    Восстановление пароля
                </h1>
                <div className={styles.input}>
                    <EmailInput value={form.email} placeholder={'Укажите e-mail'} name={'email'} onChange={onChange} />
                </div>
                <Button type="primary" htmlType="submit">
                    Восстановить
                </Button>
            </form>
            <div className={styles.footer + " text text_type_main-default"}>
                <p className={styles.text}>
                    Вспомнили пароль?
                </p>
                <Link to="/login" className={styles.link}>
                    Войти
                </Link>
            </div>
        </section>
    )
}

export default ForgotPasswordSection;