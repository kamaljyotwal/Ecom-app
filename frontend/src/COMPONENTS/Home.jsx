import React, { useEffect, useState } from "react";
import CustomTitle from "./layouts/CustomTitle";
import { useDispatch, useSelector } from "react-redux";
import { getProductsAction } from "../actions/productActions";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
// import Slider, { Range } from "rc-slider";
import { Range } from "rc-slider";
import "rc-slider/assets/index.css";

export default function Home() {
  const dispatch = useDispatch();
  const alert = useAlert();
  let { keyword } = useParams();

  const { loading, products, error, resPerPage, productsCount, allProductsCount } = useSelector(
    (state) => state.products2
  );

  // local state
  const [currentPg, setCurrentPg] = useState(1);
  const [price, setPrice] = useState([0, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  let categoryArr = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  useEffect(() => {
    dispatch(getProductsAction(currentPg, keyword, price, category, rating));
    // eslint-disable-next-line
  }, [currentPg, keyword, price, category, rating]);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    // eslint-disable-next-line
  }, [loading, error]);

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
          {/* <h1>Latest Products</h1> */}
          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <>
                  <div className="col-6 col-md-3  mt-4 left-div">
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
                    <hr className="mt-5 mb-3" />

                    <div>
                      <h4 className="mb-3">Categories</h4>

                      <ul className="pl-0">
                        {categoryArr.map((i, index) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyleType: "none",
                            }}
                            key={`${i}+${index}`}
                            onClick={() => setCategory(i)}
                          >
                            {i}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <hr className="my-3" />
                    <div className="mt-2">
                      <h4 className="mb-3">Ratings</h4>

                      <ul className="pl-0">
                        {[5, 4, 3, 2, 1].map((star, index) => (
                          <li
                            style={{
                              cursor: "pointer",
                              listStyleType: "none",
                            }}
                            key={`${star}+${index}`}
                            onClick={() => setRating(star)}
                          >
                            <div
                              className="rating-outer"
                              style={{
                                paddingLeft: "5px",
                                paddingRight: "5px",
                              }}
                            >
                              <div
                                className="rating-inner"
                                style={{
                                  width: `${star * 20}%`,

                                  paddingLeft: "5px",
                                  paddingRight: "5px",
                                }}
                              ></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <hr />
                  </div>
                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products &&
                        products.map((i) => <ProductCard eachproduct={i} col="4" key={i._id} />)}
                    </div>
                  </div>
                </>
              ) : (
                products && products.map((i) => <ProductCard eachproduct={i} col="3" key={i._id} />)
              )}
            </div>
          </section>

          {/* conditionally rendering pagination*/}
          {keyword ? (
            <>
              {productsCount >= resPerPage && (
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
          ) : (
            <>
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
        </>
      )}
    </div>
  );
}
