import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { RecipesNewPage } from "./components/RecipesNewPage";
import { RecipesPage } from "./components/RecipesPage";
import { RecipeShowPage } from "./components/RecipeShowPage";
import { Footer } from "./components/Footer";

axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "<your-backend-url>";
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
        element: <HomePage />,
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