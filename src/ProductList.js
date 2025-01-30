import React, { useState } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";

// Sample product data (Replace with dynamic data if needed)
const products = [
  {
    id: 1,
    name: "Breast Cubes 1Kg",
    price: 520,
    image: "apk.png" ,
    category: "Chicken",
  },
  {
    id: 2,
    name: "Leg Pieces 500g",
    price: 250,
    image: "path/to/image2.jpg",
    category: "Chicken",
  },
  // Add more products as necessary...
];

function ProductCard({ product, addToCart }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <img src={product.image} alt={product.name} />
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="body2">Price: ₹{product.price}</Typography>
          <Button variant="contained" color="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

function ProductList({ addToCart }) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </Grid>
  );
}

export default ProductList;

