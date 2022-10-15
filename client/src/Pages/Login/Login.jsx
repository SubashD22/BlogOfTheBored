import React from 'react'
import { useState } from 'react'
import LoginForm from '../../Components/LoginForm';
import RegisterForm from '../../Components/RegisterForm';
import './Login.css'

function Login() {
    const [formtype, setFormType] = useState('login')
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
        <div className="form">
            <div className="formbody">
                {formtype === 'Login' ? <LoginForm /> : <RegisterForm />}
                <div className="formfooter">
                    {changeForm}
                </div>
            </div>

        </div>
    )
}

export default Login