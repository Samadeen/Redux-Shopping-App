import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './App.css';
import Auth from './components/Auth';
import Layout from './components/Layout';
import Notification from './components/Notification';
import { uiActions } from './store/ui-slice';

let firstRender = true;

function App() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      return;
    }
    //send state as sending request
    dispatch(
      uiActions.showNotification({
        open: true,
        message: 'Sending Request',
        type: 'warning',
      })
    );
    const sendRequest = async () => {
      const res = await fetch(
        'https://react-http-9648f-default-rtdb.firebaseio.com/cartItems.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      //send state a request is successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sent request to Database Successfully',
          type: 'success',
        })
      );
    };
    sendRequest().catch((err) => {
      //send error state
      dispatch(
        uiActions.showNotification({
          open: true,
          message: 'Sending Request Fail',
          type: 'error',
        })
      );
    });
  }, [cart, dispatch]);

  return (
    <div className='App'>
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
