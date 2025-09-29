import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import AllPrice from "./pages/AllPrice/AllPrice";
import ItemDetail from "./pages/ItemDetail/ItemDetail";
import CategoriesDetail from "./pages/CategoriesDetail/CategoriesDetail";
import MainLayout from "./MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/prices",
        children: [
          { path: "all", element: <AllPrice /> },
          { path: ":item", element: <ItemDetail /> },
        ],
      },
      {
        path: "/categories",
        children: [{ path: ":id", element: <CategoriesDetail /> }],
      },
    ],
  },
]);
function App() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
