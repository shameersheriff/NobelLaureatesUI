import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Detail from "./pages/Detail/Detail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute component={Home} />,
  },
  {
    path: "/detail/:id",
    element: <PrivateRoute component={Detail} />,
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
