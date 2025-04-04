import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartslice";
import { Flex, Card, Button } from "antd";
import laptopImg from "../assets/images/lap.jpg";
import headphonesImg from "../assets/images/headphones.jpg";
import mobileImg from "../assets/images/mobileeeee.jpg";
import { useNavigate } from "react-router-dom";


const products = [
  { id: 1, name: "Laptop", price: 1000, image: laptopImg },
  { id: 2, name: "Phone", price: 500, image: mobileImg },
  { id: 3, name: "Headphones", price: 100, image: headphonesImg },
];

const ProductList: React.FC = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <>
      <h2>Products</h2>
      <Flex gap={16} justify="center" align="middle" wrap="wrap">
        {products.map((product) => (
          <Card key={product.id} hoverable style={{ width: 200, textAlign: "center" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{product.name} - ${product.price}</h3>
            <Button type="primary"
         onClick={() => {
            dispatch(addItem({ ...product, quantity: 1 })); 
            navigate("/cart-management/cart"); 
          }}
             >
             Add to Cart 
            </Button>
          </Card>
        ))}
      </Flex>
    </>
  );
};

export default ProductList;
