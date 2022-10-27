import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [setError] = useState(false);

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout title={product && product.name}>
      <Row className="ms-5">
        {product && product.description && (
          <Col>
            <Card
              CardType="Product"
              product={product}
              showViewProductButton={false}
            />
          </Col>
        )}
        <Col>
          <Row>
            <h4>Related products</h4>
            <Row xs={1} s={2} md={2}>
              {relatedProduct.map((p, i) => (
                <Col className="mb-3" key={i}>
                  <Card CardType="shortCard" product={p} />
                </Col>
              ))}
            </Row>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default Product;
