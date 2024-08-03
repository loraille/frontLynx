import styles from '../styles/Signup.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user'

function Signup() {
    const [signUpFirstname, setSignUpFirstname] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const dispatch = useDispatch()



    const handleClick = () => {
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstname: signUpFirstname, password: signUpPassword, email: signUpEmail }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login(data.userInfo))
                    // dispatch(login({ firstname: signUpFirstname, token: data.token, password: signUpPassword }));
                    setSignUpFirstname('');
                    setSignUpPassword('');
                    setSignUpEmail('')
                }
            })
    }


    return (
        <div>
            <main className={styles.main}>
                <div><input className={styles.input} type="text" placeholder='Firstname' onChange={(e) => setSignUpFirstname(e.target.value)} value={signUpFirstname} /></div>
                <div><input className={styles.input} type="text" placeholder='Password' onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} /></div>
                <div><input className={styles.input} type="text" placeholder='Email' onChange={(e) => setSignUpEmail(e.target.value)} value={signUpEmail} /></div>
                <button className={styles.button} onClick={() => handleClick()} >Register</button>
            </main>
        </div>
    );
}

export default Signup;