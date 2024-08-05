import styles from '../styles/Signup.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';

function Signup({ isOpen, onClose }) {
    if (!isOpen) return null;

    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

    const dispatch = useDispatch();

    const handleRegister = () => {
        console.log('Registering user:', { signUpUsername, signUpEmail, signUpPassword });
        fetch('http://localhost:3000/users/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: signUpEmail, username: signUpUsername, password: signUpPassword }),
        }).then(response => response.json())
            .then(data => {
                if (data.result) {
                    console.log(data)
                    dispatch(login({ username: data.user.username, userId: data.user.email, token: data.user.token }));
                    console.log("Bienvenito", data.user.username);
                    onClose(); // Close the modal

                } else {
                    console.warn("something went wrong", data.error);
                }
            });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
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
