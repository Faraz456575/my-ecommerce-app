import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ProductList from "./ProductList";
import Cart from "./Cart";
import AdminPanel from "./AdminPanel";
import Login from "./Login";
import { addDoc, collection } from "./firebase";

function App() {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);

  // Listen for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  // Place order function
  const placeOrder = async (tableNumber) => {
    if (cart.length === 0) return;

    const orderTime = new Date().toLocaleString();
    console.log("Placing Order for Table Number:", tableNumber);

    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        totalPrice: cart.reduce((total, item) => total + item.price, 0),
        timestamp: new Date(),
        tableNumber,
        orderTime,
        status: "new",
      });

      alert(`Order placed successfully for Table ${tableNumber}!`);
      setCart([]); // Clear cart after order placement
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("There was an error placing the order. Please try again.");
    }
  };

  // Add product function (for Admin)
  const addProduct = async (product) => {
    try {
      await addDoc(collection(db, "products"), {
        name: product.name,
        price: product.price,
        image: product.image, // Use the actual image URL
      });
      alert("Product added successfully! Refresh the page to see it.");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cart">Cart ({cart.length})</Button>
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
            </>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>

      {/* Routes Configuration */}
      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} placeOrder={placeOrder} />} />
        <Route path="/table/:tableNumber" element={<ProductList addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={user ? <AdminPanel addProduct={addProduct} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;

