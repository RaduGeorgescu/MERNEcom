import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items</h2>
        <hr />
        <Row xs={1} s={2} m={2} l={2} xl={2}>
          {items.map((product, i) => (
            <Col>
              <Card
                CardType="cart"
                key={i}
                product={product}
                showAddToCartButton={false}
                cartUpdate={true}
                showRemoveProductButton={true}
                setRun={setRun}
                run={run}
              />
            </Col>
          ))}
        </Row>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>
  );

  return (
    <Layout title="Shopping Cart" className="container-fluid">
      <Row className="row">
        <Col xs={6}>
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </Col>

        <Col xs={6}>
          <h2 className="mb-4">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </Col>
      </Row>
    </Layout>
  );
};

export default Cart;
