import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = ()=>{
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
    },[])

    const getProductDetails = async () =>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.warn(result);
        setName(result.name);
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }

    const updateProduct = async ()=>{
        console.warn(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method: 'Put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type': "application/json"
            }

        });
        result = await result.json();
        console.warn(result);
        navigate('/')
        
    }
    return (
        <div className="wrapper">
            <h1>Update Product</h1>
            <input className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name"/>
            <input className="input-box" type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Product Price"/>
            <input className="input-box" type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Product Category"/>
            <input className="input-box" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Enter Product Company"/>
            <button className="btn" type="button" onClick={updateProduct}>Add Product</button>
        </div>
    )
}

export default UpdateProduct