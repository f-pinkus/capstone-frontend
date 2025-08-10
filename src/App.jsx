import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { RecipesNewPage } from "./components/RecipesNewPage";
import { SignupPage } from "./components/SignupPage";
import { LoginPage } from "./components/LoginPage";
import { RecipesPage } from "./components/RecipesPage";
import { RecipeShowPage } from "./components/RecipeShowPage";
import { UserHomePage } from "./components/UserHomePage"; // My Recipes page
import { Footer } from "./components/Footer";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://capstone-backend-891l.onrender.com";
axios.defaults.withCredentials = true;

function Layout({ currentUser, isLoggedIn, setIsLoggedIn, setCurrentUser }) {
  return (
    <div>
      <Header
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
      <main>
        <Outlet
          context={{
            isLoggedIn,
            setIsLoggedIn,
            currentUser,
            setCurrentUser,
          }}
        />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined); // undefined = loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/me")
      .then((res) => {
        setCurrentUser(res.data);
        setIsLoggedIn(true);
      })
      .catch(() => {
        setCurrentUser(null); // no user
        setIsLoggedIn(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading user info...</h3>
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      element: (
        <Layout
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ),
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/recipes", element: <RecipesPage /> },
        { path: "/recipes/new", element: <RecipesNewPage /> },
        { path: "/recipes/:id", element: <RecipeShowPage /> },
        { path: "/signup", element: <SignupPage /> },
        { path: "/login", element: <LoginPage /> },
        {
          path: "/home",
          element: <UserHomePage user={currentUser} />, // Pass currentUser here!
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
