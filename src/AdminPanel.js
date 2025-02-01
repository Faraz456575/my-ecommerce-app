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

import React, { useState, useEffect } from "react";
import { db, collection, onSnapshot, query, orderBy, doc, updateDoc, addDoc, deleteDoc } from "./firebase";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Typography } from "@mui/material";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false); // Toggle for Completed Orders

  useEffect(() => {
    // Fetch NEW (pending) orders
    const newOrdersQuery = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const unsubscribeNew = onSnapshot(newOrdersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })).filter((order) => order.status !== "completed"); // Only show pending orders
      setOrders(ordersData);
    });

    // Fetch COMPLETED orders
    const completedOrdersQuery = query(collection(db, "completedOrders"), orderBy("timestamp", "desc"));
    const unsubscribeCompleted = onSnapshot(completedOrdersQuery, (snapshot) => {
      const completedOrdersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCompletedOrders(completedOrdersData);
    });

    return () => {
      unsubscribeNew();
      unsubscribeCompleted();
    };
  }, []);

  // Function to mark order as completed
  const markAsCompleted = async (order) => {
    try {
      const orderRef = doc(db, "orders", order.id);

      // Move order to "completedOrders" collection
      await addDoc(collection(db, "completedOrders"), { ...order, status: "completed" });

      // Delete from "orders" collection (since it's now completed)
      await deleteDoc(orderRef);

      // Update UI
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    } catch (error) {
      console.error("Error marking order as completed:", error);
      alert("Failed to complete order. Please try again.");
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Panel - {showCompleted ? "Completed Orders" : "New Orders"}
      </Typography>

      {/* Toggle Button */}
      <Button variant="contained" color="primary" onClick={() => setShowCompleted(!showCompleted)}>
        {showCompleted ? "View New Orders" : "View Completed Orders"}
      </Button>

      <Table sx={{ marginTop: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Order ID</strong></TableCell>
            <TableCell><strong>Total Price</strong></TableCell>
            <TableCell><strong>Table No.</strong></TableCell>
            <TableCell><strong>Order Time</strong></TableCell>
            <TableCell><strong>Order Details</strong></TableCell>
            {!showCompleted && <TableCell><strong>Actions</strong></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {(showCompleted ? completedOrders : orders).map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>₹{order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>{order.tableNumber}</TableCell>
              <TableCell>{order.orderTime}</TableCell>
              <TableCell>
                {order.items.map((item, index) => (
                  <div key={index}>
                    {item.name} - ₹{item.price.toFixed(2)}
                  </div>
                ))}
              </TableCell>
              {!showCompleted && (
                <TableCell>
                  <Button variant="contained" color="success" onClick={() => markAsCompleted(order)}>
                    Mark as Completed
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminPanel;

