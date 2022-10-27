import React, { useState, useEffect } from "react";
import { getCategories, list } from "./apiCore";
import Card from "./Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  });

  const { categories, category, search, results, searched } = data;

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setData({ ...data, categories: data });
      }
    });
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then(
        (response) => {
          if (response.error) {
            console.log(response.error);
          } else {
            setData({ ...data, results: response, searched: true });
          }
        }
      );
    }
  };

  const searchSubmit = (e) => {
    e.preventDefault();
    searchData();
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} products`;
    }
    if (searched && results.length < 1) {
      return `No products found`;
    }
  };

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>

        <Row xs={1} md={2} xl={3} xxl={4} className=" mx-auto ">
          {results.map((product, i) => (
            <Col key={i} className="mb-3">
              <Card CardType="shortCard" key={i} product={product} />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span
        className="input-group-text"
        style={{ backgroundColor: "#495057", borderColor: "#000" }}
      >
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select
              className="btn mr-2"
              onChange={handleChange("category")}
              style={{
                backgroundColor: "#495057",
                color: "white",
              }}
            >
              <option value="All">All</option>
              {categories.map((c, i) => (
                <option key={i} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="search"
            className="form-control text-white"
            onChange={handleChange("search")}
            placeholder="Search by name"
            style={{
              backgroundColor: "#343a40",
              color: "white",
              borderColor: "#495057",
            }}
          />
        </div>
        <div className="btn input-group-append" style={{ border: "none" }}>
          <button
            className="input-group-text"
            style={{
              backgroundColor: "#6c757d",
              color: "white",
              borderColor: "#000",
            }}
          >
            Search
          </button>
        </div>
      </span>
    </form>
  );

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="w-75 mx-auto container-fluid">
        {searchedProducts(results)}
      </div>
    </div>
  );
};

export default Search;
