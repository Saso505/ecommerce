/* eslint-disable */
import Register from "./component/Auth/Register/Register";
import Login from "./component/Auth/Login/Login";
import Home from "./component/Home/Home";
import { createHashRouter, RouterProvider } from "react-router-dom";
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
import ResetPassword from "./component/Auth/ResetPassword/ResetPassword";
import GetAllUser from "./component/Auth/GetAllUser/GetAllUser";
import VerifyToken from "./component/Auth/VerifyToken/VerifyToken";
import { CartContextProvider } from "./component/Context/CartContext";
import { Toaster } from "react-hot-toast";
import { WishContextProvider } from "./component/Context/WishContext";
import WishList from "./component/WishList/WishList";
import Order from "./component/Orders/Order";
import GetAllOrder from "./component/GetAllOrder/GetAllOrder";

// Initialize React Query
const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Protect><Home /></Protect> },
      { path: "home", element: <Protect><Home /></Protect> },
      { path: "cart", element: <Protect><Cart /></Protect> },
      { path: "categories", element: <Protect><Categories /></Protect> },
      { path: "brand", element: <Protect><Brand /></Protect> },
      { path: "products", element: <Protect><Products /></Protect> },
      { path: "product-details/:id", element: <Protect><ProductDetails /></Protect> },
      { path: "wish", element: <Protect><WishList /></Protect> },
      { path: "order", element: <Protect><Order /></Protect> },
      { path: "all-orders", element: <Protect><GetAllOrder /></Protect> },
      { path: "*", element: <h1>404 Not Found</h1> },
    ],
  },
  { path: "verify", element: <VerifyToken /> },
  { path: "update-pass", element: <UpdatePass /> },
  { path: "reset-code", element: <ResetCode /> },
  { path: "get-all-users", element: <GetAllUser /> },
  { path: "login", element: <Login /> },
  { path: "forget-pass", element: <ForgetPass /> },
  { path: "reset-pass", element: <ResetPassword /> },
  { path: "register", element: <Register /> },
]);

function App() {
  return (
    <WishContextProvider>
      <CartContextProvider>
        <QueryClientProvider client={queryClient}>
          <UserContextProvider>
            <CounterContextProvider>
              <RouterProvider router={router} />
              <Toaster />
            </CounterContextProvider>
          </UserContextProvider>
        </QueryClientProvider>
      </CartContextProvider>
    </WishContextProvider>
  );
}

export default App;
