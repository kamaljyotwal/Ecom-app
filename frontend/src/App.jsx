import { useEffect } from "react";
import Home from "./COMPONENTS/Home";
import Footer from "./COMPONENTS/layouts/Footer";
import Header from "./COMPONENTS/layouts/Header";
import Login from "./COMPONENTS/auth/Login";
import Signup from "./COMPONENTS/auth/Signup";
import ProfilePage from "./COMPONENTS/auth/Profile";
import { loadCurrentUserAction } from "./actions/authAction";
import { useDispatch } from "react-redux";

import { BrowserRouter, Route } from "react-router-dom";
import Productpage from "./COMPONENTS/ProductDetails";

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

          {/* profile page */}
          <Route path="/me" exact>
            <ProfilePage />
          </Route>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
