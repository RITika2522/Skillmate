// App.tsx
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Auth from "./pages/Auth";
import Home from "@/pages/Home";
import Mates from "./pages/Mates";
import EditProfile from "./pages/EditProfile";
import Posts from "./pages/Posts";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mates" element={<Mates />} />
      <Route path="/profile" element={<EditProfile />} />
      <Route path="/posts" element={<Posts />} />
    </Routes>
  );
};

export default App;
