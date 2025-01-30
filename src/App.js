import React, { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate, useParams } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { db, collection, addDoc } from './firebase';
import ProductList from './ProductList';
import Cart from './Cart';
import AdminPanel from './AdminPanel';
import Login from './Login';

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

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  const placeOrder = async (tableNumber) => {
    if (cart.length === 0) return;

    const orderTime = new Date().toLocaleString();

    console.log("Placing Order for Table Number:", tableNumber);

    try {
      await addDoc(collection(db, "orders"), {
        items: cart,
        totalPrice: cart.reduce((total, item) => total + item.price, 0),
        timestamp: new Date(),
        tableNumber: tableNumber, // Now correctly retains table number
        orderTime: orderTime,
        status: "new"
      });

      alert(`Order placed successfully for Table ${tableNumber}!`);
      setCart([]); // Clear cart after order placement
    } catch (error) {
      console.error("Error placing order: ", error);
      alert("There was an error placing the order. Please try again.");
    }
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/cart">Cart</Button>
          {user ? (
            <Button color="inherit" component={Link} to="/admin">Admin Panel</Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">Login</Button>
          )}
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<ProductList addToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} placeOrder={placeOrder} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={user ? <AdminPanel /> : <Navigate to="/login" />} />
        <Route path="/table/:id" element={<TablePage cart={cart} addToCart={addToCart} placeOrder={placeOrder} />} />
      </Routes>
    </div>
  );
}

const TablePage = ({ cart, addToCart, placeOrder }) => {
  const { id } = useParams(); // Access the dynamic table ID from the URL
  const tableNumber = id || "1"; // Default to "1" if no table number is provided

  return (
    <div>
      <h1>Table {tableNumber}</h1>
      <ProductList addToCart={addToCart} />
      <Button variant="contained" onClick={() => placeOrder(tableNumber)}>
        Place Order for Table {tableNumber}
      </Button>
    </div>
  );
};

export default App;

