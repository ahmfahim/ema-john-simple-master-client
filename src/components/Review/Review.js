import React,{useEffect, useState} from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager';
import './Review.css';
import ReviewItem from '../ReviewItem/ReviewItem';
import OrderPlacedImg from '../../images/giphy.gif';
import Cart from '../Cart/Cart';
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [placedOrder, setPlacedOrder] = useState(false);
    const history = useHistory()

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch('http://localhost:5000/productsByKeys',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[])

    // place order button
    const handleProceedCheckout = () => {
       history.push('/shipment')
    }

    // remove button
    const removeProduct = (productKey) =>{
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    let thankyou;
    if (placedOrder){
        thankyou = <img src={OrderPlacedImg} alt="" />
    }


    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem key={pd.key} removeProduct={removeProduct} product={pd}></ReviewItem>)
                }
                {thankyou}
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button className="main-button" onClick={handleProceedCheckout}>Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;