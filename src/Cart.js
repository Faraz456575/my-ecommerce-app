import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";

function Cart({ cart, placeOrder }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>{item.name} - ${item.price}</li>
          ))}
        </ul>
      )}
    
      <Button variant="contained" color="primary" onClick={placeOrder} disable={cart.length === 0}>
        Place order
      </Button>
    
    </div>
  );
}

export default Cart;

