import React, { useEffect } from "react";
import CustomTitle from "./layouts/CustomTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import ProductCard from "./ProductCard";

export default function Home() {
  const dispatch = useDispatch();
  const { loading, products, productsCount, error } = useSelector((state) => state.products2);

  useEffect(() => {
    dispatch(getProductsAction());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="homeDiv">
      {/* below line is for custom title */}
      <CustomTitle title="Home" />
      <h1 id="products_heading">Latest Products</h1>
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
    </div>
  );
}
