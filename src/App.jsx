import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { RecipesNewPage } from "./components/RecipesNewPage";
import { RecipesPage } from "./components/RecipesPage";
import { RecipeShowPage } from "./components/RecipeShowPage";
import { Footer } from "./components/Footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function Layout() {

  return (
    <div>
      <Header />
      
      <main>
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
}


const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/recipes" replace />,
      },
      {
        path: "/recipes",
        element: <RecipesPage />,
      },
      { 
        path: "/recipes/new", 
        element: <RecipesNewPage /> 
      },
      {
        path: "/recipes/:id",
        element: <RecipeShowPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;