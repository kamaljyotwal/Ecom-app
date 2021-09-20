import React, { useEffect } from "react";
import CustomTitle from "./layouts/CustomTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import { useAlert } from "react-alert";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error } = useSelector((state) => state.products2);

  useEffect(() => {
    dispatch(getProductsAction());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    // eslint-disable-next-line
  }, [loading]);

  return (
    <div className="homeDiv">
      {/* below line is for custom title */}
      <CustomTitle title="Home" />

      {loading ? (
        <Loader />
      ) : (
        <>
          <h1>Latest Products</h1>
          <section id="products" className="container mt-5">
            <div className="row">
              {/* looping for each product */}
              {products &&
                products.map((i) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={i._id}>
                    <ProductCard eachproduct={i} />
                  </div>
                ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
