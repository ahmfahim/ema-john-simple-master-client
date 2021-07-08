import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const { name, quantity, img, key, price } = props.product;
    const removeProduct = props.removeProduct;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h2 className="product-name">{name}</h2>
                <h4 className="product-price">Quantity: {quantity}</h4>
                <p className="product-price">Price: <strong>${price}</strong> </p>
                <button className="main-button" onClick={() => removeProduct(key)}>Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;