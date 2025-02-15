/* eslint-disable */
import Register from "./component/Auth/Register/Register";
import Login from "./component/Auth/Login/Login";
import Home from "./component/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Cart from "./component/Cart/Cart";
import Categories from "./component/Category/Categories/Categories";
import Brand from "./component/Brand/Brand";
import { CounterContextProvider } from "./component/Context/CounterContext";
import Products from "./component/Products/Products";
import UserContextProvider from "./component/Context/UserContext";
import Protect from "./component/Protect-routing/Protect";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import ForgetPass from "./component/Auth/ForgetPass/ForgetPass";
import ResetCode from "./component/Auth/ResetCode/ResetCode";
import UpdatePass from "./component/Auth/UpdatePass/UpdatePass";
import ResetPassword from "./component/Auth/Resset Password/ResetPassword";
import GetAllUser from "./component/Auth/Get allUser/GetAllUser";
import VerifyToken from "./component/Auth/verify token/VerifyToken";
import { CartContextProvider } from "./component/Context/CartContext";
import { Toaster } from "react-hot-toast";
import { WishContextProvider } from "./component/Context/WishContext";
import WishList from "./component/WishList/WishList";
import Order from "./component/oders/Order";
import GetAllOrder from "./component/GetAllOrder/GetAllOrder";




const queryClient = new QueryClient();


const router = createBrowserRouter([
  {
    path: "/ecommerce",
    element: <Layout />,
    children: [
      { index: true, element: <Protect><Home /></Protect> },
      { path: "home", element: <Protect><Home /></Protect> },
      { path: "cart", element: <Protect><Cart /></Protect> },
      { path: "categories", element: <Protect><Categories /></Protect> },
      { path: "brand", element: <Protect><Brand /></Protect> },
      { path: "products", element: <Protect><Products /></Protect> },
      { path: "ProductDetails/:id", element: <Protect><ProductDetails /></Protect> },
      { path: "whish", element: <WishList /> },
      { path: "order", element: <Order /> },
      { path:'allorders', element: <GetAllOrder/>},
  
      { path: "*", element: <h1>404 Not Found</h1> },
    ],
  },



  { path: "verify", element: <VerifyToken /> },

  { path: 'updatepass', element: <UpdatePass /> },
  { path: "rsetcode", element: <ResetCode /> },
  { path: "getalluser", element: <GetAllUser /> },
  { path: "login", element: <Login /> },

  { path: "forgetpass", element: <ForgetPass /> },
  { path: "resetpass", element: <ResetPassword /> },

  { path: "register", element: <Register /> },
]);

function App() {
  return (
    <WishContextProvider value={{ /* provide necessary values here */ }}>
    <CartContextProvider value={{ /* provide necessary values here */ }}>
      <QueryClientProvider client={queryClient}>
        <UserContextProvider>
          <CounterContextProvider>
            <RouterProvider router={router} />
            <Toaster/>
          </CounterContextProvider>
        </UserContextProvider>
      </QueryClientProvider>
    </CartContextProvider>
    </WishContextProvider>
  );
}


export default App;
