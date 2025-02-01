import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Button } from "@mui/material";
import { db, collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore methods

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

  // Function to add a product to Firestore
  const addProduct = async () => {
    try {
      await addDoc(collection(db, "products"), {
        name: "Breast Cubes 1Kg",
        price: 520,
        image: "https://your-image-url.com"
      });
      alert("Product added successfully! Refresh the page to see it.");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      {/* Add Product Button */}
      <Button variant="contained" color="secondary" onClick={addProduct} style={{ marginBottom: "20px" }}>
        Add Product
      </Button>

      {/* Display Products */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </Grid>
    </div>
  );
}

// Product Card Component
function ProductCard({ product, addToCart }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
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



