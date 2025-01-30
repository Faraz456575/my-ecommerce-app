import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Attempt to sign in
      await signInWithEmailAndPassword(auth, email, password);
      
      // If login is successful, redirect to the Admin panel
      navigate("/admin");  // Redirect to the Admin panel

    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: 300,
        margin: "auto",
        paddingTop: 5,
      }}
    >
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        margin="normal"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        margin="normal"
      />
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Display error message */}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Box>
  );
}

export default Login;
