import React, { useEffect, useState } from "react";
import CustomTitle from "./layouts/CustomTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, products, error, resPerPage, allProductsCount } = useSelector(
    (state) => state.products2
  );
  console.log(error);
  // local state
  const [currentPg, setCurrentPg] = useState(1);

  useEffect(() => {
    dispatch(getProductsAction(currentPg));
    // eslint-disable-next-line
  }, [currentPg]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
  }, [loading]);

  // pagination handler
  function paginationHandler(pg) {
    setCurrentPg(pg);
  }

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
          
          {/* conditionally render pagination*/}
          {allProductsCount >= resPerPage && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPg}
                itemsCountPerPage={resPerPage}
                totalItemsCount={allProductsCount}
                pageRangeDisplayed={5}
                onChange={paginationHandler}
                nextPageText={"next"}
                prevPageText={"prev"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
