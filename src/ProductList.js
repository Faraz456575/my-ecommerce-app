import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { db, collection, getDocs } from './firebase'; // Import Firestore methods

// Fetch products from Firestore
function ProductList({ addToCart }) {
  const [products, setProducts] = useState([]);

  // Fetch products from Firestore when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({
          id: doc.id, // Unique document ID
          ...doc.data() // Get all data from the document
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </Grid>
  );
}

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

export default ProductList;


