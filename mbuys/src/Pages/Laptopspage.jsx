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

const Laptopspage = () => {
  const [Laptops, setLaptops] = useState([]);

  useEffect(() => {
    async function getLaptops() {
      const res = await axios.get("http://localhost:3001/getproducts");

      const finalLaptops = [];

      res.data.products.map((product) => {
        if (product.category === "Laptops") {
          finalLaptops.push(product);
        }
      });
      setLaptops(finalLaptops);
    }
    getLaptops();
  }, []);

  async function sortbyprice() {
    const sortedLaptops = [...Laptops].sort((a, b) => a.price - b.price);

    setLaptops(sortedLaptops);
  }

  async function sortbyhot() {
    const sortbyhotlaptops = [...Laptops].sort(
      (a, b) => a.quantity - b.quantity
    );
    setLaptops(sortbyhotlaptops);
  }

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
            Laptops
          </Typography>
          <br></br>
          <Grid container spacing={3}>
            {Laptops.map((Laptop) => (
              <Grid item xs={4} key={Laptop.name}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={Laptop.image}
                    alt={Laptop.name}
                  />
                  <CardContent>
                    <Typography variant="h5">{Laptop.name}</Typography>
                    <Typography variant="body2"> $ {Laptop.price}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link
                        to={`/product/${Laptop._id}`}
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

export default Laptopspage;
