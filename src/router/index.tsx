import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
 } from "react-router-dom";
 import App from "../App";
import { SignIn, SignUp, Product } from "../modules";

 const Index = () => {
    const router = createBrowserRouter(
       createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
            <Route path="product" element={<Product/>}/>
          </Route> 
       )
    );
 
    return <RouterProvider router={router} />;
 };
 
 export default Index;