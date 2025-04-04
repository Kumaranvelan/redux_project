import React from "react";
import ProductList from "./productlist";
import Cart from "./cart";

const Integrate: React.FC = () => {
  return (
    <div>
      <h1>Redux Shopping Cart</h1>
      <ProductList />
      <Cart />
    </div>
  );
};

export default Integrate;
