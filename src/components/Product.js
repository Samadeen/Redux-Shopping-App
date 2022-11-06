import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/cart-slice';

import './Product.css';
const Product = ({ name, id, imgURL, price }) => {
  const dispatch = useDispatch();
  const addCartHandler = () => {
    dispatch(
      cartActions.addToCart({
        name,
        id,
        price,
      })
    );
  };
  return (
    <div className='card'>
      <img src={imgURL} alt={name} />
      <h2>{name}</h2>
      <p>$ {price}</p>
      <button onClick={addCartHandler}>Add to cart</button>
    </div>
  );
};

export default Product;
