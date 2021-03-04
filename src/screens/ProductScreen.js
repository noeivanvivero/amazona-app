import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating'

export default function ProductScreen(props) {
    const productId = props.match.params.id;
    const [qty,setQty] = useState(1);
    const addToCartHandler = () => {
        props.history.push(`/cart/${productId}?qty=${qty}`);
    }
    const productDetails = useSelector(state => state.productDetails);
    const { loading, error, product } = productDetails;
    const reduxDispatch = useDispatch();
    useEffect(()=>{
        reduxDispatch(detailsProduct(productId))
    },[productId,reduxDispatch]);

    return (
        <div>
            {loading ? (<LoadingBox></LoadingBox>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
            (<div>
                <div className="row top">
                    <Link to="/">Back to results</Link>
                    <div className="col-2">
                        <img className="large" src={product.image} alt={product.name}></img>
                    </div>
                    <div className="col-1">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                <Rating rating={product.rating} numReviews={product.numReviews}></Rating>
                            </li>
                            <li>${product.price}</li>
                            <li><p>{product.description}</p></li>
                        </ul>
                    </div>
                    <div className="col-1">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="row">
                                        <div>Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="row">
                                        <div>Status</div>
                                        <div>
                                            {product.countInStock > 0 ? <span className="success">In Stock</span> : <span className="danger">Unavailable</span>}
                                        </div>
                                    </div>
                                </li>
                                {product.countInStock > 0 && (
                                    <>
                                        <li>
                                            <div className="row">
                                                <div>Qty</div>
                                                <div>
                                                    <select value={qty} onChange={event=>setQty(event.target.value)}>
                                                        {
                                                            [...Array(product.countInStock).keys()].map(
                                                                (index)=>(<option key={index+1} value={index+1}>{index+1}</option>)
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        </li> 
                                        <li>
                                            <button onClick={addToCartHandler} className="primary block">Add to cart</button>
                                        </li>
                                    </>
                                )}
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    )
}