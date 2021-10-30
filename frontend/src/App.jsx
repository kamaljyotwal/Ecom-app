import { useEffect } from "react";
import Home from "./COMPONENTS/Home";
import Footer from "./COMPONENTS/layouts/Footer";
import Header from "./COMPONENTS/layouts/Header";
import Login from "./COMPONENTS/auth/Login";
import Signup from "./COMPONENTS/auth/Signup";
import ProfilePage from "./COMPONENTS/auth/Profile";
import UpdateProfile from "./COMPONENTS/user/updateProfile";
import PasswordUpdate from "./COMPONENTS/user/PasswordUpdate";
import Payment from "./COMPONENTS/cart/Payment";
import { loadCurrentUserAction } from "./actions/authAction";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./COMPONENTS/route/ProtectedRoute";

import { BrowserRouter, Route } from "react-router-dom";
import Productpage from "./COMPONENTS/ProductDetails";
import Dashboard from "./COMPONENTS/auth/Dashboard";
import ForgotPassword from "./COMPONENTS/user/ForgotPassword";
import NewPassword from "./COMPONENTS/user/NewPassword";
import Cart from "./COMPONENTS/cart/Cart";
import Shipping from "./COMPONENTS/cart/Shipping";
import ConfirmOrder from "./COMPONENTS/cart/ConfirmOrder";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCurrentUserAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          {/* home route */}
          <Route path="/" exact>
            <Home />
          </Route>

          {/* product page */}
          <Route path="/product/:productId" exact>
            <Productpage />
          </Route>

          {/* search */}
          <Route path="/search/:keyword">
            <Home />
          </Route>

          {/* login page */}
          <Route path="/login" exact>
            <Login />
          </Route>

          {/* register user page */}
          <Route path="/register" exact>
            <Signup />
          </Route>

          <Route path="/cart" exact>
            <Cart />
          </Route>

          <Route path="/password/reset/:hashedTkn" exact>
            <NewPassword />
          </Route>

          <ProtectedRoute path="/shipping" exact>
            <Shipping />
          </ProtectedRoute>

          <ProtectedRoute path="/payment" exact>
            <Payment />
          </ProtectedRoute>

          {/* profile page | protected  */}
          <ProtectedRoute path="/me" exact>
            <ProfilePage />
          </ProtectedRoute>

          {/* dashboard | protected | admin */}
          <ProtectedRoute path="/dashboard" adminRoute exact>
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute path="/confirm" exact>
            <ConfirmOrder />
          </ProtectedRoute>

          <ProtectedRoute path="/me/update" exact>
            <UpdateProfile />
          </ProtectedRoute>

          <ProtectedRoute path="/password/update" exact>
            <PasswordUpdate />
          </ProtectedRoute>

          <Route path="/password/forgot" exact>
            <ForgotPassword />
          </Route>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
