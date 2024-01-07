import React, { FormEvent, useCallback, useState } from "react";
import styles from "./reset-password-section.module.css"
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../utils/api";

function ResetPasswordSection() {
    const [form, setValue] = useState({ password: '', code: '' });
    const navigate = useNavigate();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const saveNewPassword = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            resetPassword("/password-reset/reset", form.password, form.code)
            .then((ans) => {
                if (ans.success) {
                    navigate('/login');
                }
            })
        }, [form, navigate]
    )

    return (
        <section className={styles.section}>
            <form className={styles.form} onSubmit={saveNewPassword}>
                <h1 className={styles.input + " text text_type_main-medium"}>
                    Восстановление пароля
                </h1>
                <div className={styles.input}>
                    <PasswordInput value={form.password} placeholder={'Введите новый пароль'} name={'password'} onChange={onChange}/>
                </div>
                <div className={styles.input}>
                    <Input value={form.code} placeholder={'Введите код из письма'} name={'code'} onChange={onChange}/>
                </div>
                <Button type="primary" htmlType="submit">
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