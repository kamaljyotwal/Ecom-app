import React from "react";
import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

export default function MetaData({ title }) {
  return (
    <Helmet>
      <title>{`${title} - ShopByKamal`}</title>
    </Helmet>
  );
}
// 👇️ define prop types for the component
MetaData.propTypes = {
  title: PropTypes.string,
};
