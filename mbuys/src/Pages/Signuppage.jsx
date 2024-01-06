import React from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import NavBar from "../Componets/NavBar";
import { useState } from "react";
import axios from "axios";
import Footer from "../Componets/Footer";

const Signuppage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [password, setPassword] = useState("");

  async function Signup() {
    const data = {
      name: name,
      email: email,
      phoneno: phoneNumber,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:3001/signup", data);
      alert("User Registered Successfully");
      window.location.href = "/";
    } catch (error) {
      alert("User Already Exists");
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
            Sign Up
          </Typography>
          <TextField
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            onChange={(e) => {
              const phoneNumber = e.target.value;
              if (phoneNumber.length <= 10) {
                setPhoneNumber(phoneNumber);
              }
            }}
            error={phoneNumber.length !== 10}
            helperText={
              phoneNumber.length !== 10 ? "Phone number must be 10 digits" : ""
            }
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button variant="contained" type="button" onClick={Signup}>
            Submit
          </Button>
          <Typography variant="body1">
            Already have an account? <a href="/login">Login</a>
          </Typography>
        </Box>
      </div>
    </>
  );
};

export default Signuppage;
