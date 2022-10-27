import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import moment from "moment";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f,
  run = undefined,
  CardType,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-primary mt-2 mb-2 card-btn-1">
            View Product
          </button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <button
          onClick={addToCart}
          className="btn btn-outline-warning mt-2 mb-2 card-btn-1  "
        >
          Add to cart
        </button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span
        style={{ backgroundColor: "#0d6efd" }}
        className="badge badge-primary badge-pill"
      >
        In Stock
      </span>
    ) : (
      <span
        style={{ backgroundColor: "#000" }}
        className="badge badge-primary badge-pill"
      >
        Out of Stock
      </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run);
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span
                className="input-group-text"
                style={{
                  backgroundColor: "#495057",
                  color: "white",
                  borderColor: "#000",
                }}
              >
                Adjust Quantity
              </span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              style={{
                backgroundColor: "#495057",
                color: "white",
                borderColor: "#000",
              }}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run);
          }}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          Remove Product
        </button>
      )
    );
  };

  if (CardType === "shortCard") {
    return (
      <div
        className="card h-100"
        style={{
          backgroundColor: "#343a40",
          color: "white",
          borderColor: "#000",
        }}
      >
        <div className="p-0 card-body d-flex flex-column">
          {shouldRedirect(redirect)}
          <Link to={`/product/${product._id}`}>
            <ShowImage
              CardType="shortCard"
              className="mx-auto"
              item={product}
              url="product"
            />
          </Link>

          <Row className="mx-2">
            <Col>
              <Row>
                <h5 className="text-start">
                  <Link
                    style={{ textDecoration: "none", color: "white" }}
                    to={`/product/${product._id}`}
                  >
                    {product.name}
                  </Link>
                </h5>
              </Row>
              <Row>
                <div className="mx-auto">{showStock(product.quantity)}</div>
              </Row>
            </Col>
            <Col>
              <Row>
                <p className="text-end card-text" style={{ fontSize: "13px" }}>
                  Category: {product.category && product.category.name}
                </p>
              </Row>
              <Row>
                <h5 className="text-end card-text">$ {product.price}</h5>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="my-2 p-0 card-footer">
          {/* <br /> */}
          <Row className="mx-1">
            <Col>
              {showViewButton(showViewProductButton)}
              {showCartUpdateOptions(cartUpdate)}
            </Col>
            <Col className="text-end">
              {showAddToCartBtn(showAddToCartButton)}
              {showRemoveButton(showRemoveProductButton)}
            </Col>
          </Row>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={CardType === "cart" ? "card mb-2" : "card w-75 mh-50 mb-2"}
        style={{
          backgroundColor: "#343a40",
          color: "white",
          borderColor: "#000",
        }}
      >
        <div className="card-body d-flex flex-column ">
          {shouldRedirect(redirect)}
          <ShowImage item={product} url="product" />
          <h1>{product.name}</h1>

          <h5 className="card-text mt-2 mb-auto">
            {product.description.substring(0, 100)}
          </h5>
          <h4 className="mt-4 card-text">$ {product.price}</h4>
          <p className="">
            Category: {product.category && product.category.name}
          </p>
        </div>
        <div className="card-footer mt-1">
          <p className="">Added on {moment(product.createdAt).fromNow()}</p>
          {showStock(product.quantity)}
          <br />

          {showViewButton(showViewProductButton)}

          {showAddToCartBtn(showAddToCartButton)}

          {showRemoveButton(showRemoveProductButton)}

          {showCartUpdateOptions(cartUpdate)}
        </div>
      </div>
    );
  }
};

export default Card;
