// App.tsx
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Auth from "./pages/Auth";
import Home from "@/pages/Home";
import Mates from "./pages/Mates";
import EditProfile from "./pages/EditProfile";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/home" element={<Home />} />
      <Route path="/mates" element={<Mates />} />
      <Route path="/profile" element={<EditProfile />} />
    </Routes>
  );
};

export default App;
