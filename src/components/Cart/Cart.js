import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, prd) => total + prd.price * prd.quantity, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price * product.quantity;
    }

    let shipping = 0;
    if (total > 35) {
        shipping = 0;
    }
    if (total > 15) {
        shipping = 4.99;
    }
    else if (total > 0) {
        shipping = 12.99;
    }
    const tax = Math.round(total / 10).toFixed(2);
    const grandTotal = (total + shipping + Number(tax)).toFixed(2);

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    return (
        <div>
            <h4 className="cart-title">Order Summery</h4>
            <p className="cart-body">Item: <span> {cart.length} </span> </p>
            <p className="cart-body">Product Price: <span> {formatNumber(total)} </span> </p>
            <p className="cart-body"><small>Shipping: <span> {shipping} </span> </small></p>
            <p className="cart-body"><small>Tax:  <span> {tax} </span> </small></p>
            <p className="total">Total: <span> {grandTotal} </span> </p>
            {props.children}
        </div>
    );
};

export default Cart;