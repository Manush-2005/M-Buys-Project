import React from "react";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useContext } from "react";
import DiscountContext from "./DiscountContext";

const Checkout = ({ cartItems, total, fees }) => {
  const isEligibleForDiscount = useContext(DiscountContext);
  const grandTotal = isEligibleForDiscount ? (total + fees) / 2 : total + fees;

  return (
    <>
      <div style={{ marginTop: "8%" }}>
        <Container maxWidth="md">
          <Typography variant="h4" align="center" gutterBottom>
            Checkout
          </Typography>
          <List>
            {cartItems.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item.name}
                  secondary={`Price: $${item.price} Quantity: ${item.quantity}`}
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem>
              <ListItemText primary="Total" />
              <Typography variant="body1">${total}</Typography>
            </ListItem>
            <ListItem>
              <ListItemText primary="MBUYS FEES" />
              <Typography variant="body1">${fees}</Typography>
            </ListItem>

            {isEligibleForDiscount && (
              <ListItem>
                <ListItemText primary="MBUYS Discount" />
                <Typography variant="body1" color="secondary">
                  Congratulations! You are eligible for a 50% discount.
                </Typography>
              </ListItem>
            )}
            <ListItem>
              <ListItemText primary="Grand Total" />
              <Typography variant="body1">${grandTotal}</Typography>
            </ListItem>
          </List>
          <Box mt={5}>
            <Link to={`/payment/${grandTotal}`}>
              <Button variant="contained" color="primary" fullWidth>
                Proceed to Payment
              </Button>
            </Link>
          </Box>
        </Container>
      </div>
    </>
  );
};

export default Checkout;
