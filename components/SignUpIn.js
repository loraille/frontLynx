import styles from '../styles/SignIn.module.css';

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
                <div className={styles.title}>
                    Hey please Sign In for such action <br />
                    <div className={styles.button} style={{ color: '#feb830' }} onClick={() => handleOpenModal('signin')} >Sign In</div>
                    No account yet ? Sign Up now!!! <br /> you will be able to bookmark artworks, follow your prefered artists, share your artworks to others, ... and more!
                    <div className={styles.button} style={{ color: '#feb830' }} onClick={() => handleOpenModal('signup')}>Sign Up</div>
                    <br />
                    Or continue with google :
                    <div className={styles.divider}></div>
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
                    }
                </div>
                {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />}
            </div>
        </div >

    )
}

export default SignUpIn;
