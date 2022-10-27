import React, { useState } from "react";

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    handleFilters(event.target.value);
    setValue(event.target.value);
  };

  return prices.map((p, i) => (
    <div key={i}>
      <input onChange={handleChange} value={`${p._id}`} name={p} type="radio" />
      <label className="ms-2 form-check-label">{p.name}</label>
    </div>
  ));
};

export default RadioBox;
