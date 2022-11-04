import React from "react";
import { API } from "../config";
import Image from "react-bootstrap/Image";

const ShowImage = ({ item, url, CardType }) => (
  <Image
    src={`${API}/${url}/photo/${item._id}`}
    alt={item.name}
    className="mb-3"
    width=// {50}
    {CardType === "shortCard" && "100%"} //shortcard or product make product page
    height=//{50}
    {CardType === "shortCard" && 330}
  />
);

export default ShowImage;
