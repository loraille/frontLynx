import styles from '../styles/signIn.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user'

function signIn() {

    const [signInPassword, setsignInPassword] = useState('')
    const [signInEmail, setsignInEmail] = useState('')
    const dispatch = useDispatch()

    const handleClick = () => {
        fetch('http://localhost:3000/users/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signInEmail, password: signInPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data) {
                    dispatch(login(data.userInfo))
                    // dispatch(login({ firstname: signInFirstname, token: data.token, password: signInPassword }));
                    setsignInPassword('');
                    setsignInEmail('')
                    console.log(`${data.userInfo.firstname} logged`)

                }
            })
    }


    return (
        <div>
            <main className={styles.main}>
                <div><input className={styles.input} type="text" placeholder='Email' onChange={(e) => setsignInEmail(e.target.value)} value={signInEmail} /></div>
                <div><input className={styles.input} type="text" placeholder='Password' onChange={(e) => setsignInPassword(e.target.value)} value={signInPassword} /></div>
                <button className={styles.button} onClick={() => handleClick()} >Sign in</button>
            </main>
        </div>
    );
}

export default signIn;