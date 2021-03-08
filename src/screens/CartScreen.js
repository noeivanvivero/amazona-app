import React, { useEffect } from 'react'
import {addToCart} from '../actions/cartActions'
import {useDispatch, useSelector} from 'react-redux'
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
export default function CartScreen(props){
    const productId = props.match.params.id;
    const qty = props.location.search? Number(props.location.search.split('=')[1]) : 1;
    const cart = useSelector(state=>state.cart);
    const {cartItems} = cart;

    const reduxDispatch = useDispatch();
    useEffect(()=>{
        if(productId) reduxDispatch(addToCart(productId,qty));
    },[reduxDispatch, productId, qty]);

    const removeFromCartHandler = (id)=>{
        // delete
    }
    const checkoutHandler = () =>{
        props.history.push('/signin?redirect=shipping');
    }
    const message = (<MessageBox>Cart is empty. <Link to="/">Go Shopping</Link></MessageBox>)
    const shoppinglist = (
        <ul>
            {cartItems.map(item=>(
                <li key={item.product}>
                    <div className="row">
                        <div>
                            <img src={item.image} alt={item.name} className="small"></img>
                        </div>
                        <div className="min-30">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </div>
                        <div>
                            <select vlaue={item.qty} onChange={e=>reduxDispatch(addToCart(item.product,Number(e.target.value)))}>
                                {
                                    [...Array(item.countInStock).keys()].map(
                                        (index)=>(<option key={index+1} value={index+1}>{index+1}</option>)
                                    )
                                }
                            </select>
                        </div>
                        <div>{item.price}</div>
                        <div><button type="buttton" onClick={()=>removeFromCartHandler(item.product)}>Delete</button></div>
                    </div>
                </li>
            ))}
        </ul>
    )
    const render = (
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length === 0?  message : shoppinglist}
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((previous,current)=> previous+current.qty,0)} items) : ${cartItems.reduce((previous,current)=> previous+(current.price * current.qty),0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" className="primary block" disabled={cartItems.length===0} onClick={checkoutHandler}>
                                Proceed to checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
    return (render);
}