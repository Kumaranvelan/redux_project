import { Route, Routes } from "react-router-dom"
import { Content } from "../content"
import Language from "../language"
import { TodoList } from "../todo"
import { Increment } from "../increase"
import { ThemeSwitch } from "../theme"
import { ListPage } from "../logical/list"
import { Login } from "../login/login"
import Integrate from "../cart-management/integrate"
import Cart from "../cart-management/cart"
import ProductList from "../cart-management/productlist"

export const AppRouter:React.FC =() =>{
return (
    <>
       <Routes>
       <Route path="/" element={<Login/>} />
       {/* <Route path="/cart-management/integrate" element={<Integrate/>} />
       <Route path="/cart-management/cart" element={<Cart/>} />
       <Route path="/cart-management/productlist" element={<ProductList/>} /> */}
      <Route path="/content" element={<Content />} />
      <Route path ="/language" element={<Language/>} />
      <Route path ="/todo" element={<TodoList/>} />
      <Route path ="/increase" element={<Increment/>} />
      <Route path ="/theme" element={<ThemeSwitch/>} />
      <Route path="/list" element={<ListPage/>} />
    </Routes>
    </>
)
}