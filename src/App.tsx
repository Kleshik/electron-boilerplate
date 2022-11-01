import {
  createHashRouter, RouterProvider
} from "react-router-dom";
import { RootLayout } from "./RootLayout";

const router = createHashRouter([{
  path: "/", element: <RootLayout />, children: []
}])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;