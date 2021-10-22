import { useEffect } from "react";
import Home from "./COMPONENTS/Home";
import Footer from "./COMPONENTS/layouts/Footer";
import Header from "./COMPONENTS/layouts/Header";
import Login from "./COMPONENTS/auth/Login";
import Signup from "./COMPONENTS/auth/Signup";
import ProfilePage from "./COMPONENTS/auth/Profile";
import UpdateProfile from "./COMPONENTS/user/updateProfile";
import PasswordUpdate from "./COMPONENTS/user/PasswordUpdate";
import { loadCurrentUserAction } from "./actions/authAction";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./COMPONENTS/route/ProtectedRoute";

import { BrowserRouter, Route } from "react-router-dom";
import Productpage from "./COMPONENTS/ProductDetails";
import Dashboard from "./COMPONENTS/auth/Dashboard";

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

          {/* profile page | protected  */}
          <ProtectedRoute path="/me" exact>
            <ProfilePage />
          </ProtectedRoute>

          {/* dashboard | protected | admin */}
          <ProtectedRoute path="/dashboard" adminRoute exact>
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute path="/me/update" exact>
            <UpdateProfile />
          </ProtectedRoute>

          <ProtectedRoute path="/password/update" exact>
            <PasswordUpdate />
          </ProtectedRoute>
          
          {/* <ProtectedRoute path="/me" component={ProfilePage} exact /> */}
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
