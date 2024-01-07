import React, { FormEvent, useCallback, useState } from "react";
import styles from "./register-section.module.css"
import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { registrationRequest } from "../../services/actions/auth-actions";
import { useDispatch } from "../../hooks/useDispatch";

function RegisterSection() {
    const [form, setValue] = useState({ name: '', email: '', password: '' });
    const dispatch = useDispatch();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            dispatch(registrationRequest(form));
        }, [form, dispatch]
    )

    return (
        <section className={styles.section}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h1 className={styles.input + " text text_type_main-medium"}>
                    Регистрация
                </h1>
                <div className={styles.input}>
                    <Input value={form.name} placeholder={'Имя'} name={'name'} onChange={onChange}/>
                </div>
                <div className={styles.input}>
                    <EmailInput value={form.email} name={'email'} onChange={onChange}/>
                </div>
                <div className={styles.input}>
                    <PasswordInput value={form.password} name={'password'} onChange={onChange}/>
                </div>
                <Button type="primary" htmlType="submit">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={styles.footer + " text text_type_main-default"}>
                <p className={styles.text}>
                    Уже зарегистрированы?
                </p>
                <Link to="/login" className={styles.link}>
                    Войти
                </Link>
            </div>
        </section>
    )
}

export default RegisterSection;