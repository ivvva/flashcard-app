
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MyCollections from "./pages/MyCollections";
import NewCollection from "./pages/NewCollection";
import NewCard from "./pages/NewCard";
import Training from "./pages/Training";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:userId/dashboard" element={<Dashboard />} />
        <Route path="/:userId/new-collection" element={<NewCollection />} />
        <Route path="/:userId/my-collections" element={<MyCollections />} />
        <Route path="/:userId/:newCollectionId/new-card/" element={<NewCard />} />
        <Route path="/:userId/:collectionId/train" element={<Training />} />
      </Routes>
    </div>
  );
}
export default App;
