import Home from "./COMPONENTS/Home";
import Footer from "./COMPONENTS/layouts/Footer";
import Header from "./COMPONENTS/layouts/Header";
import Login from "./COMPONENTS/user/Login";
import { BrowserRouter, Route } from "react-router-dom";
import Productpage from "./COMPONENTS/ProductDetails";

function App() {
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
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
