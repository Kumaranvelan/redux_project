import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { clearCart, removeItem, updateQuantity } from "../store/cartslice";
import { Button, Flex, Input } from "antd";
import { doc, Firestore, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../environment/environment";

const Cart: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const auth = getAuth();
  const userId = auth?.currentUser?.uid

  const removeCartQuantityFirestore = async (db:Firestore,userId:string,productToRemove:any) => {
    const cartRef = doc(db,"products", userId);
    const cartSnap = await getDoc(cartRef);

    if(cartSnap.exists()) {
      const data = cartSnap.data();
      const existingProducts = data.products || [];

      const updatedProducts = existingProducts.filter(
        (item:any)=> item.id !== productToRemove?.id
      );

      await updateDoc(cartRef,{
        products:updatedProducts
      })
    }
  }

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
          <Button 
       onClick={async()=> {
       dispatch(removeItem(item.id))
       if(userId) {
      await  removeCartQuantityFirestore(db,userId,item)

       }
       }}
          >Remove</Button>
        </div>
      ))}
     
      </Flex>
     <br/>
      {cart.length > 0 && <Button onClick={() => dispatch(clearCart())}>Clear Cart</Button>}
    </div>
  );
};

export default Cart;
