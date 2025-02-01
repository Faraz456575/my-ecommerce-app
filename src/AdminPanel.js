/*
import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot } from './firebase';  // Import 'onSnapshot' for real-time updates
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the orders in real-time
    const ordersQuery = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));

    
    const unsubscribe = onSnapshot(collection(db, 'orders'), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,  // Add document ID
        ...doc.data()
      }));
      setOrders(ordersData); // Set state with fetched orders
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);  // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Admin Panel - Orders</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Total Price</TableCell>
            

            <TableCell>Table No.</TableCell>
            <TableCell>Order Time</TableCell>
            <TableCell>Order Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>{order.orderTime}</TableCell>

              <TableCell>    {order.items.map(item => (
                  <div key={item.name}>
                    {item.name} - ${item.price}
                  </div>
                ))}</TableCell>

          
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminPanel;
*/

/*2nd
import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, query, orderBy } from './firebase';  // Import 'onSnapshot' and 'orderBy' for real-time updates and sorting
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Create a query to fetch orders ordered by 'timestamp' in descending order
    const ordersQuery = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));

    // Fetch the orders in real-time
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,  // Add document ID
        ...doc.data()
      }));
      setOrders(ordersData); // Set state with fetched orders
    });

    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);  // Empty dependency array means this runs once on mount

  return (
    <div>
      <h2>Admin Panel - Orders</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Table No.</TableCell>
            <TableCell>Order Time</TableCell>
            <TableCell>Order Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>{order.orderTime}</TableCell>

              <TableCell>
                {order.items.map(item => (
                  <div key={item.name}>
                    {item.name} - ${item.price}
                  </div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminPanel;

*/

/*

import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, query, orderBy, updateDoc, doc } from './firebase';  
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

function AdminPanel() {
  const [newOrders, setNewOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  useEffect(() => {
    // Query for new (incomplete) orders
    const newOrdersQuery = query(collection(db, 'orders'), orderBy('timestamp', 'desc'));
    
    // Listen for real-time updates
    const unsubscribe = onSnapshot(newOrdersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Separate orders into new and completed based on "status"
      const newOrdersList = ordersData.filter(order => !order.completed);
      const completedOrdersList = ordersData.filter(order => order.completed);

      setNewOrders(newOrdersList);
      setCompletedOrders(completedOrdersList);
    });

    return () => unsubscribe();
  }, []);

  // Function to mark an order as completed
  const completeOrder = async (orderId) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        completed: true, // Set order as completed
      });
      console.log(`Order ${orderId} marked as completed.`);
    } catch (error) {
      console.error('Error marking order as completed:', error);
    }
  };

  return (
    <div>
      <h2>Admin Panel - New Orders</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Table No.</TableCell>
            <TableCell>Order Time</TableCell>
            <TableCell>Order Details</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {newOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>{order.orderTime}</TableCell>
              <TableCell>
                {order.items.map(item => (
                  <div key={item.name}>{item.name} - ${item.price}</div>
                ))}
              </TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={() => completeOrder(order.id)}
                >
                  Mark as Completed
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <h2>Admin Panel - Completed Orders</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Order ID</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Table No.</TableCell>
            <TableCell>Order Time</TableCell>
            <TableCell>Order Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {completedOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>${order.totalPrice}</TableCell>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>{order.orderTime}</TableCell>
              <TableCell>
                {order.items.map(item => (
                  <div key={item.name}>{item.name} - ${item.price}</div>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminPanel;
*/
import React, { useState } from "react";
import { db, collection, addDoc } from "./firebase"; // Firestore functions
import { Button, TextField } from "@mui/material";

function AdminPanel() {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    image: "",
  });

  const addProduct = async () => {
    if (!productDetails.name || !productDetails.price || !productDetails.image) {
      alert("Please fill all fields!");
      return;
    }

    try {
      await addDoc(collection(db, "products"), {
        name: productDetails.name,
        price: parseFloat(productDetails.price), // Ensure price is stored as number
        image: productDetails.image,
      });

      alert("Product added successfully!");
      setProductDetails({ name: "", price: "", image: "" }); // Reset form
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Try again.");
    }
  };

  return (
    <div>
      <h2>Admin Panel - Add Product</h2>

      <TextField
        label="Product Name"
        variant="outlined"
        fullWidth
        value={productDetails.name}
        onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })}
        margin="normal"
      />

      <TextField
        label="Price"
        type="number"
        variant="outlined"
        fullWidth
        value={productDetails.price}
        onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })}
        margin="normal"
      />

      <TextField
        label="Image URL"
        variant="outlined"
        fullWidth
        value={productDetails.image}
        onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })}
        margin="normal"
      />

      <Button variant="contained" color="primary" onClick={addProduct} style={{ marginTop: "10px" }}>
        Add Product
      </Button>
    </div>
  );
}

export default AdminPanel;


