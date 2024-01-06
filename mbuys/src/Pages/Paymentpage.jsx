import React, { useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Box, TextField, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as jwtDecode from "jwt-decode";
import NavBar from "../Componets/NavBar";

const stripePromise = loadStripe(
  "pk_test_51ORrkTSDFTMRtEKL8WY9pnDA2Z8u4argfuFj87Sw49NLi6VFnUGfStB9mgxVWaeEY2lNdd02Ju5KP4UuwYdaj0XP00FsyhWPbQ"
);

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Roboto", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const PaymentForm = () => {
  const { total } = useParams();
  const [products, setProducts] = React.useState([]);
  const [buyuser, setBuyuser] = React.useState(null);

  useEffect(() => {
    function getuser() {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode.jwtDecode(token);
      const user = decoded.isuser;
      return user;
    }

    const user = getuser();
    setBuyuser(user);
    const id = user._id;

    async function getproducts() {
      const res = await axios.get(`http://localhost:3001/getcart/${id}`);
      setProducts(res.data.products);
    }
    getproducts();
  }, []);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert("Error in Transaction Please Try Again");
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      products.map(async (productid) => {
        const res = await axios.post(
          `http://localhost:3001/addtoOrder/${productid}/${buyuser._id}`
        );
        console.log(res);
      });
      window.location.href = "/thankyou";
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {/* <img src={Logo} alt="Company Logo" /> */}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Payment details
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required id="name" name="name" label="Name" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!stripe}
          >
            Pay ${total}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const PaymentPage = () => {
  return (
    <>
    <NavBar/>
      <div style={{ marginTop: "10%" }}>
        <Typography variant="h4" align="center" gutterBottom>
          MBUYS.COM
        </Typography>
        <Elements stripe={stripePromise}>
          <PaymentForm />
        </Elements>
      </div>
    </>
  );
};

export default PaymentPage;
