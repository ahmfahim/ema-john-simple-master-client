import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './Product.css'
import {Link} from 'react-router-dom';

const Product = (props) => {
    const{img, name, seller, price, stock, key}=props.product;
    return (
        <div className="product">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-details">
                <h4 className="product-name">
                    <Link to={"/product/"+ key }>{name}</Link>
                </h4>
                <p className="seller-deals"><small>by: {seller}</small></p>
                <h3 className="product-price">${price}</h3>
                <p className="product-stock" >Only {stock} left in stock - Order soon</p>
                {props.showAddToCart && <button
                    className="main-button"
                    onClick={()=>props.handleAddProduct(props.product)}
                    ><FontAwesomeIcon icon={faShoppingCart}/>add to cart</button>}
            </div>
        </div>
    );
};

export default Product;