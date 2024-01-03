import React, { useCallback, useState } from "react";
import styles from "./reser-password-section.module.css"
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { resetPassword } from "../../utils/api";

function ResetPasswordSection() {
    const [form, setValue] = useState({ email: '', password: '' });

    const onChange = (e) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const saveNewPassword = useCallback(
        (e) => {
            e.preventDefault();
            resetPassword("/password-reset/reset", form.email, form.code);
        }, [form]
    )

    return (
        <section className={styles.section}>
            <form className={styles.form} onSubmit={saveNewPassword}>
                <h1 className={styles.input + " text text_type_main-medium"}>
                    Восстановление пароля
                </h1>
                <div className={styles.input}>
                    <PasswordInput value={form.name} placeholder={'Введите новый пароль'} name={'password'} onChange={onChange}/>
                </div>
                <div className={styles.input}>
                    <Input value={form.name} placeholder={'Введите код из письма'} name={'code'} onChange={onChange}/>
                </div>
                <Button type="primary">
                    Сохранить
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

export default ResetPasswordSection;