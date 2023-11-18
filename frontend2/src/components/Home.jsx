import React from "react";
import MetaData from "./layouts/Metadata";
import { useGetProductsQuery } from "../redux/api/productsApi";
import ProductItem from "./product/ProductItem";

export default function Home() {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <>
      <MetaData title="Buy Best Products Online" />
      <div className="row">
        <div className="col-6 col-md-12">
          <h1 id="products_heading" className="text-secondary">
            Latest Products
          </h1>

          <section id="products" className="mt-5">
            <div className="row">
              {data && data.data.map((i) => <ProductItem key={i.stocks} product={i} />)}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
