import React, { useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();

  // Ensure props.options exists and is an array with at least one object
    const options = props.options || {};
    const brands = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [brand, setBrand] = useState("");
  const handleAddtoCart = async () => {
    if (!brand) {
      alert("Please select a brand before adding to cart.");
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.partItem._id,
      name: props.partItem.name,
      price: options[brand],
      qty: qty,
      brand: brand,
    });

    console.log(data);
  };
  console.log("Brands array in render:", );

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.partItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.partItem.name}</h5>
          <p className="card-text">{props.partItem.description}</p>

          <div className="container">

            {/* Quantity Dropdown */}
            <select
              className="m-2 h-100 bg-danger rounded text-white"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>


            {/* Brand Dropdown */}
            <select
              className="d-inline h-100 fs-8 me-3 bg-danger rounded text-white"
              onChange={(e) => setBrand(e.target.value)} >
              <option value="" disabled selected>
                Select Brand
              </option>
              {brands.map((brandName) => (
                <option key={brandName} value={brandName}>
                  {brandName}
                </option>
              ))}
            </select>


            {/* Total Price Display */}
            <div className="d-inline h-100 fs-8 ms-2">
              Total Price: ₹{brand ? qty * options[brand] : 0}
            </div>

            <hr />


            {/* Add to Cart Button */}
            <button
              className="btn btn-danger justify-center ms-2"
              onClick={handleAddtoCart} >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
