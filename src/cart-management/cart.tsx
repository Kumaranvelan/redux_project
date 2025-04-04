import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearCart, removeItem, updateQuantity } from "../store/cartslice";
import { Button, Flex, Input } from "antd";


const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (

    <div>
    <h2>Shopping Cart</h2>
 <Flex gap={16} justify="center" align="middle" wrap="wrap"> 
      {cart.length === 0 ? <p>Cart is empty.</p> : null}
      {cart.map((item:any) => (
        <div key={item.id}>
          <h3>{item.name} - ${item.price}</h3>
          <Input
            type="number"
            value={item.quantity}
            onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
            min="1"
          />
          <Button onClick={() => dispatch(removeItem(item.id))}>Remove</Button>
        </div>
      ))}
     
      </Flex>
     <br/>
      {cart.length > 0 && <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>}
    </div>
  );
};

export default Cart;
