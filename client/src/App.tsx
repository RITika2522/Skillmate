// App.tsx
import { Routes, Route } from "react-router-dom";
import Hero from "./pages/Hero";
import Auth from "./pages/Auth";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
};

export default App;
