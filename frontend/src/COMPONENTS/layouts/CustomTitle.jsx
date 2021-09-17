import React from "react";
import { Helmet } from "react-helmet";

export default function CustomTitle({ title }) {
  return (
    <Helmet>
      <title>{`${title} - ShopByKamal`}</title>
    </Helmet>
  );
}
