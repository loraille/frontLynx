import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { urlBackend } from '../assets/varGlobal'

function SignIn({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const dispatch = useDispatch();

    const handleConnection = () => {
        console.log(signUpUsername, signUpPassword);
        fetch(`${urlBackend}/users/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: signUpUsername, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    dispatch(login({ username: data.userInfo.username, userId: data.userInfo.email, token: data.userInfo.token }));
                    onClose();
                } else {
                    console.warn("something went wrong", data.error);
                }
            });
    };

    return (
        <div className={styles.overlay} onClick={onClose} style={{ zIndex: 1300 }}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ zIndex: 1301 }}>
                <p className="title">Enter in the place!</p>
                <div>
                    <div><input type="text" placeholder="Username" id="signUpUsername" className={styles.inputField} onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} /></div>
                    <div><input type="password" placeholder="Password" id="signUpPassword" className={styles.inputField} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} /></div>
                    <button id="register" className={`button ${styles.register}`} onClick={handleConnection}>Sign In</button>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
