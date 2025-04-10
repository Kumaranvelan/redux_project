import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/cartslice";
import { Flex, Card, Button } from "antd";
import laptopImg from "../assets/images/lap.jpg";
import headphonesImg from "../assets/images/headphones.jpg";
import mobileImg from "../assets/images/mobileeeee.jpg";
import { useNavigate } from "react-router-dom";
import { getStorage } from "firebase/storage";
import { doc, setDoc, updateDoc, getFirestore, arrayUnion, getDoc, Firestore } from 'firebase/firestore';
import { db } from "../environment/environment";
import { getAuth } from "firebase/auth";


const products = [
  { id: 1, name: "Laptop", price: 1000, image: laptopImg },
  { id: 2, name: "Phone", price: 500, image: mobileImg },
  { id: 3, name: "Headphones", price: 100, image: headphonesImg },
];

const ProductList: React.FC = () => {

const navigate = useNavigate();
const auth = getAuth();
const userId = auth.currentUser?.uid;
  const dispatch = useDispatch();
  const session = useSelector((state:any) => state.session?.isAuthenticated)
  // const userId = session?.user; 

  console.log(userId,"userIduserIduserIduserId")

  const createNewCartFireSore = async ( db: Firestore,userId:string,product:any ) => {
    const cartDoc = doc(db,'products',`${userId}`);
    const newCart = {
      userId,
      product
    };
    await setDoc(cartDoc,newCart,{merge:true})
  }



  return (
    <>
      <h2>Products</h2>
      <Flex gap={16} justify="center" align="middle" wrap="wrap">
        {products.map((product) => (
          <Card key={product.id} hoverable style={{ width: 200, textAlign: "center" }}>
            <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
            <h3>{product.name} - ${product.price}</h3>
            <Button type="primary"
         onClick={async () => {
            dispatch(addItem({ ...product, quantity: 1 })); 
         
            if (userId) {
              await createNewCartFireSore(db, userId, product);
            }
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
