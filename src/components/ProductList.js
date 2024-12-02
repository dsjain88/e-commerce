import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = ()=>{
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts= async()=>{
        let result = await fetch("http://localhost:5000/products",{
            headers: {
                authorization: JSON.parse(localStorage.getItem('token'))
            }
        })
        result = await result.json();
        setProducts(result);
    }
    
    const deleteProduct = async (id)=>{
        let result = await fetch(`http://localhost:5000/product/${id}`,{
            method: 'Delete',

        });
        result = await result.json()
        if(result){
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        console.warn(event.target.value);
        let key = event.target.value;
            if(key){
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if(result){
                setProducts(result)
            }
        }else{
            getProducts();
        }
        
    }


    
    return(
        <div className="wrapper">
            <h3>Product List</h3>
            <input type="text" placeholder="Search Product" onChange={searchHandle} />
            <table className="table-wrapper">
                <thead>
                <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Company</th>
                    <th>Operation</th>
                </tr>
                </thead>
                <tbody>
                {
                    products.length>0 ? products.map((item, index)=>
                        <tr key={item._id}>
                            <td>{index+1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.company}</td>
                            <td>
                                <Link to={"/update/" + item._id}>Update</Link>
                                <button onClick={()=>deleteProduct(item._id)}>Delete</button>
                            </td>
                        </tr>
                    )
                    : <h1>No More Result</h1>
                }
                </tbody>
            </table>
        </div>
    )
}

export default ProductList;