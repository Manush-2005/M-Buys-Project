import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import NavBar from "../Componets/NavBar";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Footer from "../Componets/Footer";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function Login() {
    const data = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:3001/login", data);

      alert("User Logged in Successfully");
      const token = res.data.token;
      if (token) {
        localStorage.setItem("token", token);
        window.location.href = "/HomePage";
      }
    } catch (error) {
      alert("Invalid Credentials");
    }
  }

  return (
    <>
      <div style={{ marginTop: "142px", left: "39%" }}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            marginTop: 5,
          }}
          noValidate
          autoComplete="off"
        >
          <Typography variant="h4" component="h1">
            Login
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="contained" type="button" onClick={Login}>
            Submit
          </Button>
          <Typography variant="body1">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default Loginpage;
