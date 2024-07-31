import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/common/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute component={Home} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
