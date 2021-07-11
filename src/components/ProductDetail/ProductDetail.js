import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetail = () => {
    const { productKey } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`https://ema-john-store-server.herokuapp.com/product/${productKey}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productKey])
    return (
        <div>
            <h1>Product Details|-</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;