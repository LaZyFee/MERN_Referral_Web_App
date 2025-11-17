import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from "../components/products/Products";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard/Dashboard";
import { Home } from "../pages/Home";
import { Profile } from "../components/Profile/Profile";
import ProtectedRoute from "./ProtectedRoute";
import Checkout from "../components/Checkout/Checkout";
import SuccessPage from "../components/Checkout/SuccessPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/products", element: <Products /> },

      {
        element: <ProtectedRoute />,
        children: [
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/profile", element: <Profile /> },
          { path: "/checkout", element: <Checkout /> },
          { path: "/checkout/success", element: <SuccessPage /> },
        ],
      },
    ],
  },
]);
