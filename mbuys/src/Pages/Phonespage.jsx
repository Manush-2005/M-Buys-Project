import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NavBar from "../Componets/NavBar";

const Phonespage = () => {
  const [phones, setphones] = useState([]);

  useEffect(() => {
    async function getphones() {
      const res = await axios.get("http://localhost:3001/getproducts");

      const finalphones = [];

      res.data.products.map((product) => {
        if (product.category === "Phones") {
          finalphones.push(product);
        }
      });
      setphones(finalphones);
    }
    getphones();
  }, []);

  async function sortbyprice() {
    const sortedPhones = [...phones].sort((a, b) => a.price - b.price);

    setphones(sortedPhones);
  }

  async function sortbyhot() {
    const sortbyhotphones = [...phones].sort((a, b) => a.quantity - b.quantity);
    setphones(sortbyhotphones);
  }

  //   const phones = [
  //     // Add your phone data here
  //     // Example: { name: 'iPhone 13', price: '$699', image: 'url-to-image' }
  //   ];

  return (
    <>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper elevation={3} style={{ marginTop: "61%" }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <FormControlLabel
              control={<Checkbox />}
              label="Price-Lowest to Highest"
              onClick={sortbyprice}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Hot Items"
              onClick={sortbyhot}
            />
          </Paper>
        </Grid>

        <Grid item xs={9} style={{ marginTop: "9%" }}>
          <Typography variant="h4" gutterBottom>
            Phones
          </Typography>
          <br></br>
          <Grid container spacing={3}>
            {phones.map((phone) => (
              <Grid item xs={4} key={phone.name}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={phone.image}
                    alt={phone.name}
                  />
                  <CardContent>
                    <Typography variant="h5">{phone.name}</Typography>
                    <Typography variant="body2"> $ {phone.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link
                        to={`/product/${phone._id}`}
                        style={{ color: "black", textDecoration: "none" }}
                      >
                        View More
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Phonespage;
