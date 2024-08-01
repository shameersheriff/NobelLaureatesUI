import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import PrivateRoute from "./components/common/PrivateRoute";
import Detail from "./pages/Detail/Detail";

export enum ScreenRoute {
  Home = "/",
  Laureate_Detail = "/laureateDetail",
  Login = "/login",
  Register = "/register",
}

export const router = createBrowserRouter([
  {
    path: ScreenRoute.Home,
    element: <PrivateRoute component={Home} />,
  },
  {
    path: `${ScreenRoute.Laureate_Detail}/:id`,
    element: <PrivateRoute component={Detail} />,
  },
  {
    path: ScreenRoute.Login,
    element: <Login />,
  },
  {
    path: ScreenRoute.Register,
    element: <Register />,
  },
]);
