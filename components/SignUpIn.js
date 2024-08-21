import styles from "../styles/SignUpin.module.css";
import { useState } from "react";
// Connexion with google
// import { GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from "jwt-decode";

function SignUpIn({ isOpen, onClose, onOpenModal }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  // Connexion with google
  // const [uzer, setUzer] = useState({ username: null, email: null });

  if (!isOpen) return null;

  const handleOpenModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
    console.log("type isModalOpen", type, isModalOpen);
  };

  const handleCloseModal = () => {
    console.log("####SUI handleCloseModal");
    setIsModalOpen(false);
    setModalType("");
  };

  const setTypeOfModal = (type) => {
    setIsModalOpen(true);
    setModalType(type);
  };

  return (
    <div className={styles.overlay} onClick={onClose} style={{ zIndex: 5 }}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ zIndex: 5, color: "white" }}
      >
        <div className={styles.container}>
          <span className="title">Welcome in the place!</span>
          Hey please Sign In for such actions
          <button
            id="register"
            className={`button ${styles.register}`}
            onClick={() => {
              setTypeOfModal("signin");
              onOpenModal("signin");
            }}
          >
            Sign In
          </button>
          Not account ? Sign Up Now !
          <button
            id="register"
            className={`button ${styles.register}`}
            onClick={() => {
              setTypeOfModal("signup");
              onOpenModal("signup");
            }}
          >
            Sign Up
          </button>
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
        {/* {modalType === 'signup' && <Signup isOpen={isModalOpen} onClose={handleCloseModal} />}
                {modalType === 'signin' && <SignIn isOpen={isModalOpen} onClose={handleCloseModal} />} */}
      </div>
    </div>
  );
}

export default SignUpIn;
