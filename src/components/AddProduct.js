import React, { useState } from "react";

function AddProduct({ onAddProduct }) {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product); // Pass data to parent
    setProduct({ name: "", price: "", discount: "", image: "", category: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input type="number" name="discount" value={product.discount} onChange={handleChange} placeholder="Discount" />
      <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
      <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" />
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProduct;
