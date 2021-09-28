import React, { useEffect, useState } from "react";
import CustomTitle from "./layouts/CustomTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { keyword } = useParams();

  const { loading, products, error, resPerPage, allProductsCount } = useSelector(
    (state) => state.products2
  );

  // local state
  const [currentPg, setCurrentPg] = useState(1);
  const [price, setPrice] = useState([0, 1000]);

  useEffect(() => {
    dispatch(getProductsAction(currentPg, keyword, price));
    // eslint-disable-next-line
  }, [currentPg, keyword, price]);

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
              {keyword ? (
                <>
                  <div className="col-6 col-md-3 mt-5 mb-5 left-div">
                    <Range
                      marks={{
                        1: `$1`,
                        1000: `$1000`,
                      }}
                      min={1}
                      max={1000}
                      defaultValue={[1, 1000]}
                      tipFormatter={(value) => `$${value}`}
                      tipProps={{
                        placement: "top",
                        visible: true,
                      }}
                      value={price}
                      onChange={(price) => setPrice(price)}
                    />
                  </div>
                  <div className="col-6 col-md-3 col-lg-9 right-div">
                    {products &&
                      products.map((i) => (
                        // <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={i._id}>
                        <div className="col-sm-12 col-md-6 col-lg-4 my-3" key={i._id}>
                          <ProductCard eachproduct={i} />
                        </div>
                      ))}
                  </div>
                </>
              ) : (
                products &&
                products.map((i) => (
                  <div className="col-sm-12 col-md-6 col-lg-3 my-3" key={i._id}>
                    <ProductCard eachproduct={i} />
                  </div>
                ))
              )}
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
