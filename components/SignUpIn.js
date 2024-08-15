import styles from '../styles/SignUpin.module.css';

import SignIn from './SignIn';
import Signup from './Signup';
import { useState } from 'react';

import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


function SignUpIn({ isOpen, onClose }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    //WIP test...
    const [uzer, setUzer] = useState({ username: null, email: null });


    if (!isOpen) return null;

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
        console.log("type isModalOpen", type, isModalOpen);
    };
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalType('');
    };

    return (

        <div className={styles.overlay} onClick={onClose} style={{ zIndex: 1300 }} >
            <div className={styles.modal} onClick={(e) => e.stopPropagation()} style={{ zIndex: 1301, color: 'white' }}>
                <div className={styles.container}>
                    <span className='title'>Welcome in the place!</span>
                    <button id="register" className={`button ${styles.register}`} onClick={() => handleOpenModal('signin')}>Sign In</button>
                    Hey please Sign Up for such actions
                    <button id="register" className={`button ${styles.register}`} onClick={() => handleOpenModal('signup')}>Sign Up</button>

                    {/*------------------------------------------------- CONNEXION GOOGLE------------------------------- */}
                    {/*  <div className={styles.divider}></div>
                    Or continue with google :
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            const decoded = jwtDecode(credentialResponse.credential);
                            setUzer({ name: decoded.name, email: decoded.email });
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    {uzer.name &&
                        <div className={styles.content}>
                            <h1 >Welcome {uzer.name} !</h1>
                            <div className={styles.divider}></div>
                            <p> Email: {uzer.email}</p>
                        </div>
                    } */}
                </div>
                {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
            </div>
        </div >

    )
}

export default SignUpIn;
