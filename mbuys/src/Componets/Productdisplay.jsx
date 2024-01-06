import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const ProductDisplay = ({ products }) => {
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category}>
          <Typography variant="h4" gutterBottom component="div">
            {category}
          </Typography>
          <Grid container spacing={3}>
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ${product.price}
                    </Typography>
                    <Button variant="contained" color="primary">
                      <Link
                        to={`/product/${product._id}`}
                        style={{ color: "white", textDecoration: "none" }}
                      >
                        View More
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <br></br>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplay;
