import React from "react";

const AddProduct = ()=>{
    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [company, setCompany] = React.useState("");
    const addProduct = async ()=>{
        console.warn(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:5000/add-product', {
            method: 'post',
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                'Content-Type':'application/json'
            }
        })
        result = await result.json()
        console.warn(result);
        
    }
    return (
        <div className="wrapper">
            <h1>Add Product</h1>
            <input className="input-box" type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter Product Name"/>
            <input className="input-box" type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="Enter Product Price"/>
            <input className="input-box" type="text" value={category} onChange={(e)=>setCategory(e.target.value)} placeholder="Enter Product Category"/>
            <input className="input-box" type="text" value={company} onChange={(e)=>setCompany(e.target.value)} placeholder="Enter Product Company"/>
            <button className="btn" type="button" onClick={addProduct}>Add Product</button>
        </div>
    )
}

export default AddProduct