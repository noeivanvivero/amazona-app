import './App.css';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import { useDispatch, useSelector } from 'react-redux';
import SigninScreen from './screens/SigninScreen';
import { signout } from './actions/userActions';
import RegisterScreen from './screens/RegisterScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import { signoutShippingAddress } from './actions/cartActions';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  const cart = useSelector(state => state.cart);
  const {cartItems} = cart;
  const userSignin = useSelector(state => state.userSignin);
  const {userInfo} = userSignin;
  const reduxDispatch = useDispatch();
  const signoutHandler = () =>{
    reduxDispatch(signout());
    reduxDispatch(signoutShippingAddress());
  }

  return (
    <BrowserRouter>
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">amazona</Link>
        </div>
        <div>
          {cartItems.length > 0? 
            <span className="badge">{cartItems.length}</span> :
            <></>
          }
          <Link to="/cart">Cart</Link>
          {
            userInfo? 
            (
              <div className = "dropdown">
                <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i></Link>
                <ul className="dropdown-content">
                  <Link to="#" onClick={signoutHandler}>Sign Out</Link>
                </ul>
              </div>
            )
            :
            (<Link to="/signin">Sign In</Link>)
          }
        </div>
      </header>
      <main>
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component ={ProductScreen}></Route>
        <Route path="/register" component={RegisterScreen} exact></Route>
        <Route path="/signin" component={SigninScreen} exact></Route>
        <Route path="/shipping" component={ShippingAddressScreen} exact></Route>
        <Route path="/payment" component={PaymentMethodScreen} exact></Route>
        <Route path="/placeorder" component={PlaceOrderScreen} exact></Route>
        <Route path="/order/:id" component={OrderScreen} exact></Route>
        <Route path="/" component={HomeScreen} exact></Route>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
