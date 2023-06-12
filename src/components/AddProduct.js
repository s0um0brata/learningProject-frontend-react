import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);

  const notify = () => {
    toast.success('Product Added Successfully', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  const addProduct = async () => {
    if(!name || !price || !category || !company){
        setError(true)
        return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    let result = await fetch("http://localhost:5000/add-product", {
      method: "POST",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "Content-type" : "application/json",
        Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    });
    result = await result.json();
    console.log(result);

    setName("");
    setPrice("");
    setCategory("");
    setCompany("")
  };

  const handleClick = () => {
    addProduct()
    notify()
  }
  return (
    <div className="product">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        theme="light"
      />
      <h1>Add Product</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
      />
      {error && !name && <span className="invalid-input">Enter a valid name</span>}

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
      />
      {error && !price && <span className="invalid-input">Enter a valid price</span>}

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
      />
      {error && !category && <span className="invalid-input">Enter a valid category</span>}

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
      />
      {error && !company && <span className="invalid-input">Enter a valid company</span>}
      
      <button onClick={handleClick} className="appButton">
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
