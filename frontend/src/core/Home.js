import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts } from "./apiCore";
import Card from "./Card";
import Search from "./Search";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [setError] = useState(false);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = () => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  return (
    <Layout title="Radu's ecommerce shop" className="container-fluid h-100">
      <Search />
      <div className="w-75 mx-auto">
        <h2 className="mb-4 ">New Arrivals</h2>
        <Row xs={1} md={2} xl={3} xxl={4} className=" mx-auto ">
          {productsByArrival.map((product, i) => (
            <Col key={i} className="mb-3">
              <Card CardType="shortCard" product={product} />
            </Col>
          ))}
        </Row>

        <h2 className="mb-4 ">Best Sellers</h2>
        <Row xs={1} md={2} xl={3} xxl={4} className=" mx-auto ">
          {productsBySell.map((product, i) => (
            <Col key={i} className="mb-3">
              <Card CardType="shortCard" product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
};

export default Home;
