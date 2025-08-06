import axios from "axios";
import { Header } from "./components/Header";
import { RecipesPage } from "./components/RecipesPage";
import { Footer } from "./components/Footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Header />
      <RecipesPage />
      <Footer />
    </div>
  )
}

export default App;