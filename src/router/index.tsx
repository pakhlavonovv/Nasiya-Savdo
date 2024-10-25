import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
 } from "react-router-dom";
 import App from "../App";
 import SignIn from '../modules/auth/pages/sign-in'
 import SignUp from '../modules/auth/pages/sign-up'

 const Index = () => {
    const router = createBrowserRouter(
       createRoutesFromElements(
          <Route path="/" element={<App />}>
            <Route index element={<SignIn/>}/>
            <Route path="sign-up" element={<SignUp/>}/>
          </Route> 
       )
    );
 
    return <RouterProvider router={router} />;
 };
 
 export default Index;