import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { urlBackend } from "../assets/varGlobal";
import styles from "../styles/Signup.module.css";

function Signup({ isOpen, onClose }) {
  if (!isOpen) return null;
  //////////////////setup////////////////////////////////////////
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  /////////////////////sign up//////////////////////////////////
  const handleRegister = () => {
    // Test email format
    const emailPattern =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    if (!emailPattern.test(signUpEmail)) {
      setErrorMessage("Invalid email format");
      return;
    }
    const passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordPattern.test(signUpPassword)) {
      setErrorMessage("Invalid Password, example: Lynx777!");
      return;
    }

    console.log("Registering user:", {
      signUpUsername,
      signUpEmail,
      signUpPassword,
    });
    fetch(`${urlBackend}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: signUpEmail,
        username: signUpUsername,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log(data);
          dispatch(
            login({
              username: data.userInfo.username,
              userId: data.userInfo.email,
              token: data.userInfo.token,
            })
          );
          console.log("Bienvenito", data.userInfo.username);
          onClose(); // Close the modal
        } else {
          console.warn("Something went wrong", data.error);
          setErrorMessage(data.error);
        }
      });
  };
  ////////view or not the password////////////////////////////////////
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  //////prevent navigator issues only handleClickShowPassword exec////
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className={styles.overlay} onClick={onClose} >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="title">Create your account</p>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            color: "white",
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-basic-email"
            label="Email"
            variant="outlined"
            className="customTextField"
            onChange={(e) => setSignUpEmail(e.target.value)}
            value={signUpEmail}
          />
          <TextField
            id="outlined-basic-username"
            label="Username"
            variant="outlined"
            className="customTextField"
            onChange={(e) => setSignUpUsername(e.target.value)}
            value={signUpUsername}
          />
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className="customTextField"
            onChange={(e) => setSignUpPassword(e.target.value)}
            value={signUpPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {!showPassword ? (
                      <VisibilityOff className={styles.showPasswordOff} />
                    ) : (
                      <Visibility className={styles.showPassword} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <button
          id="register"
          className={`button ${styles.register}`}
          onClick={handleRegister}
        >
          Sign up
        </button>
      </div>
    </div>
  );
}

export default Signup;
