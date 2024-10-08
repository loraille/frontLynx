import styles from "../styles/SignIn.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { urlBackend } from "../modules/utils";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignIn({ isOpen, onClose }) {
  if (!isOpen) return null;
  ///////////////////////setup///////////////////////////////
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  /////////////////////////Sign in////////////////////////////
  const handleConnection = () => {
    fetch(`${urlBackend}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: data.userInfo.username,
              userId: data.userInfo.email,
              token: data.userInfo.token,
            })
          );
          onClose();
        } else {
          console.warn("something went wrong", data.error);
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
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="title">Enter in the place!</p>
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
            id="outlined-basic-username"
            label="Username"
            variant="outlined"
            className="customTextField"
            onChange={(e) => setSignInUsername(e.target.value)}
            value={signInUsername}
          />
          <TextField
            id="outlined-basic-password"
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            className="customTextField"
            onChange={(e) => setSignInPassword(e.target.value)}
            value={signInPassword}
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
          onClick={handleConnection}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default SignIn;
