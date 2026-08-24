import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Profile from "./components/Profile.jsx";
import Notes from "./pages/Notes/Notes.jsx";
import About from "./pages/About/About.jsx";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
