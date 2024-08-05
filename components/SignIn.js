import styles from '../styles/signIn.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user'

function signIn({ isOpen, onClose, children }) {
    if (!isOpen) return null;


    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpemail, setSignUpemail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    // const [signInUsername, setSignInUsername] = useState('');
    // const [signInPassword, setSignInPassword] = useState('');

    ///////////////////Fonction signup signin



    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <p className={styles.heading}>Create your account</p>
                <div className={styles.form}>
                    <div><input type="text" placeholder="email" id="signUpemail" className={styles.inputField} onChange={(e) => setSignUpemail(e.target.value)} value={signUpemail} /></div>
                    <div><input type="text" placeholder="Username" id="signUpUsername" className={styles.inputField} onChange={(e) => setSignUpUsername(e.target.value)} value={signUpUsername} /></div>
                    <div><input type="password" placeholder="Password" id="signUpPassword" className={styles.inputField} onChange={(e) => setSignUpPassword(e.target.value)} value={signUpPassword} /></div>
                    <button id="register" className={styles.centerButton}
                        onClick={() => handleRegister()}>Sign up</button></div>
            </div>
            <div>
                <div>

                </div>

            </div>
        </div>
    );
};


export default signIn;