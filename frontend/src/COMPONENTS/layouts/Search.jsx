import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// export default function Search({ history }) {
export default function Search() {
  let history = useHistory();
  const [search, setSearch] = useState("");

  function setSearchHandler(e) {
    e.preventDefault();
    if (search.trim()) {
      history.push(`/search/${search}`);
    } else {
      history.push("/");
    }
  }

  return (
    <form onSubmit={setSearchHandler}>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="input-group-append">
          <button id="search_btn" className="btn">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  );
}
