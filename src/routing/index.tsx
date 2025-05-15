import { Navigate, Route, Routes } from "react-router-dom"
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
import { Register } from "../login/register"
import { useAppSelector } from "../store/hook"
import { PrivateRoute } from "./private-routing"
import Layout from "../layout"

export const AppRouter:React.FC =() =>{
 
  const isAuthenticated = useAppSelector((state)=>state.session.isAuthenticated);

return (
    <>
       <Routes>
            <Route path="/" element={<Layout/>} />
       <Route
    path="/"
    element={
      isAuthenticated ? <Navigate to="/content" /> : <Navigate to="/login" />
    }
  />

  {/* Login route */}
  <Route
    path="/login"
    element={
      isAuthenticated ? <Navigate to="/content" /> : <Login />
    }
  />

  {/* Register route (optional guard) */}
  <Route
    path="/register"
    element={
      isAuthenticated ? <Navigate to="/content" /> : <Register />
    }
  />

  {/* Protected route example */}
  <Route
    path="/content"
    element={
      <PrivateRoute isAuthenticated={isAuthenticated}>
        <Content />
      </PrivateRoute>
    }
  />
       <Route path="/cart-management/integrate" element={<Integrate/>} />
       <Route path="/cart-management/cart" element={<Cart/>} />
       <Route path="/cart-management/productlist" element={<ProductList/>} />
       <Route path="/register" element={<Register/>} />
      {/* <Route path="/content" element={<Content />} /> */}
      <Route path ="/language" element={<Language/>} />
      <Route path ="/todo" element={<TodoList/>} />
      <Route path ="/increase" element={<Increment/>} />
      <Route path ="/theme" element={<ThemeSwitch/>} />
      <Route path="/list" element={<ListPage/>} />
     
    </Routes>
    </>
)
}