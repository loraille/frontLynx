import styles from '../styles/Signup.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import { urlBackend } from '../assets/varGlobal'

function Signup({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const dispatch = useDispatch();

    const handleRegister = () => {
        console.log('Registering user:', { signUpUsername, signUpEmail, signUpPassword });
        fetch(`${urlBackend}/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signUpEmail, username: signUpUsername, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log(data)
                    dispatch(login({ username: data.userInfo.username, userId: data.userInfo.email, token: data.userInfo.token }));
                    console.log("Bienvenito", data.userInfo.username);
                    onClose(); // Close the modal
                } else {
                    console.warn("something went wrong", data.error);
                }
            });
    };

    return (
        <div className={styles.overlay} onClick={onClose} style={{ zIndex: 1300 }} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ zIndex: 1301 }} >
                <p className="title">Create your account</p>
                <div className={styles.form}>
                    <div>
                        <input
                            type="text"
                            placeholder="Email"
                            id="signUpEmail"
                            className={styles.inputField}
                            onChange={(e) => setSignUpEmail(e.target.value)}
                            value={signUpEmail}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            id="signUpUsername"
                            className={styles.inputField}
                            onChange={(e) => setSignUpUsername(e.target.value)}
                            value={signUpUsername}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            id="signUpPassword"
                            className={styles.inputField}
                            onChange={(e) => setSignUpPassword(e.target.value)}
                            value={signUpPassword}
                        />
                    </div>
                    <button id="register" className={`button ${styles.register}`} onClick={handleRegister}>
                        Sign up
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Signup;
