import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/HomePage/home_page.jsx";
import Login from "./components/UserPages/user_login.jsx";
import Signup from "./components/UserPages/user_register.jsx";

import AdminLogin from "./components/UserPages/admin_login.jsx";
import AdminRegister from "./components/UserPages/admin_register.jsx";
import AdminDash from "./components/UserPages/admin/admin_dash.jsx";
import AdduserAdmin from "./components/UserPages/admin/add_user.jsx"
import UpdateuserAdmin from "./components/UserPages/admin/update_user.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "admin_login",
    element: <AdminLogin />,
  },
  {
    path: "admin_reg",
    element: <AdminRegister />,
  },
  {
    path: "admin_dashboard",
    element: <AdminDash />,
  },
  {
    path: "admin_add_user",
    element: <AdduserAdmin />,
  },
  {
    path: "admin_update_user/:userId",
    element: <UpdateuserAdmin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
