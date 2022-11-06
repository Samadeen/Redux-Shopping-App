import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Notification from './components/Notification';

function App() {
  const cart = useSelector((state) => state.cart);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  // const cartItems = useSelector((state) => state.cart.itemsList);
  // console.log(cartItems);
  useEffect(() => {
    fetch(
      'https://react-http-9648f-default-rtdb.firebaseio.com/cartItems.json',
      {
        method: 'PUT',
        body: JSON.stringify(cart),
      }
    );
  }, [cart]);

  return (
    <div className='App'>
      <Notification type='Success' message={'This Message'} />
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
