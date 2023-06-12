/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(()=>{
    getProductsDetails()
  },[])

  const getProductsDetails = async () => {
    console.log(params)
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers:{
        Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
    })
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const updateProduct = async () => {
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      method:'PUT',
      body:JSON.stringify({name, price, category, company}),
      headers:{
        'Content-Type':'application/json',
        Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    })
    result = await result.json()
    console.log(result)
    navigate('/')
  };
  return (
    <div className="product">
      <h1>Update Product</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Name"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Price"
      />

      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Category"
      />

      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        className="inputBox"
        type="text"
        placeholder="Enter Product Company"
      />

      <button onClick={updateProduct} className="appButton">
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
