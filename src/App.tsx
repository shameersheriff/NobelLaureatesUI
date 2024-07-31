import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routers";
import { AuthProvider } from "./context/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
