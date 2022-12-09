import React from 'react'
import { useState } from 'react'
import LoginForm from '../../Components/LoginForm';
import RegisterForm from '../../Components/RegisterForm';
import style from './Login.module.css'

function Login() {
    const [formtype, setFormType] = useState('Login')
    const changetoReg = () => {
        setFormType('Register')
    };
    const changetoLog = () => {
        setFormType('Login')
    };
    let changeForm;
    if (formtype === 'Login') {
        changeForm = (<p> New here ? <span onClick={changetoReg}>Register</span></p>)
    } else {
        changeForm = (<p> Already a user ? <span onClick={changetoLog}>Login</span></p>)
    }

    return (
        <div className={style.form}>
            <div className={style.formbody}>
                {formtype === 'Login' ? <LoginForm /> : <RegisterForm />}
                <div className={style.formfooter}>
                    {changeForm}
                </div>
            </div>

        </div>
    )
}

export default Login