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
*/import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, onSnapshot, query, orderBy } from "./firebase";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, TextField, Grid, useMediaQuery } from "@mui/material";

function AdminPanel() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({ name: "", price: "", image: "" });
  const [editId, setEditId] = useState(null);
  const [view, setView] = useState("orders");
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const newOrdersQuery = query(collection(db, "orders"), orderBy("timestamp", "desc"));
    const unsubscribeNew = onSnapshot(newOrdersQuery, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter((order) => !order.completed));
    });

    const completedOrdersQuery = query(collection(db, "completedOrders"), orderBy("timestamp", "desc"));
    const unsubscribeCompleted = onSnapshot(completedOrdersQuery, (snapshot) => {
      setCompletedOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribeNew();
      unsubscribeCompleted();
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, []);

  const markAsCompleted = async (order) => {
    try {
      await updateDoc(doc(db, "orders", order.id), { completed: true });
      await addDoc(collection(db, "completedOrders"), order);
      setOrders((prevOrders) => prevOrders.filter((o) => o.id !== order.id));
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  const handleProductSubmit = async () => {
    if (!productDetails.name || !productDetails.price || !productDetails.image) {
      alert("Please fill all fields!");
      return;
    }
    try {
      if (editId) {
        await updateDoc(doc(db, "products", editId), productDetails);
      } else {
        await addDoc(collection(db, "products"), productDetails);
      }
      setProductDetails({ name: "", price: "", image: "" });
      setEditId(null);
    } catch (error) {
      console.error("Error handling product:", error);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <h2>Admin Panel - {showCompleted ? "Completed Orders" : "New Orders"}</h2>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant="contained" color="primary" fullWidth onClick={() => setShowCompleted(!showCompleted)}>
            {showCompleted ? "View New Orders" : "View Completed Orders"}
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" color="secondary" fullWidth onClick={() => setView("products")}>Manage Products</Button>
        </Grid>
      </Grid>

      {view === "orders" && (
        <Table size={isMobile ? "small" : "medium"}>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Total Price</TableCell>
              <TableCell>Table No.</TableCell>
              <TableCell>Order Details</TableCell>
              {!showCompleted && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {(showCompleted ? completedOrders : orders).map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>${order.totalPrice}</TableCell>
                <TableCell>{order.tableNumber}</TableCell>
                <TableCell>
                  {order.items.map((item) => (
                    <div key={item.name}>{item.name} - ${item.price}</div>
                  ))}
                </TableCell>
                {!showCompleted && (
                  <TableCell>
                    <Button variant="contained" color="success" onClick={() => markAsCompleted(order)}>
                      Complete
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {view === "products" && (
        <>
          <h3>Manage Products</h3>
          <TextField label="Product Name" value={productDetails.name} onChange={(e) => setProductDetails({ ...productDetails, name: e.target.value })} fullWidth margin="normal" />
          <TextField label="Price" type="number" value={productDetails.price} onChange={(e) => setProductDetails({ ...productDetails, price: e.target.value })} fullWidth margin="normal" />
          <TextField label="Image URL" value={productDetails.image} onChange={(e) => setProductDetails({ ...productDetails, image: e.target.value })} fullWidth margin="normal" />
          <Button variant="contained" color={editId ? "secondary" : "primary"} onClick={handleProductSubmit}>{editId ? "Update" : "Add"} Product</Button>

          <h3>Product List</h3>
          <Table>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>₹{product.price}</TableCell>
                  <TableCell><img src={product.image} alt={product.name} width="50" /></TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => setEditId(product.id)}>Edit</Button>
                    <Button variant="contained" color="error" onClick={() => deleteProduct(product.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
}

export default AdminPanel;



