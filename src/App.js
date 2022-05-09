import "./App.css";
import DemoForm from "./pages/Demo/DemoForm";
import PlayGround from "./pages/PlayGround";
import Welcome from "./pages/Welcome";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/UI/NavigationBar/NavigationBar";
function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<DemoForm />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="playGround" element={< PlayGround/>} />
      </Routes>
    </div>
  );
}

export default App;
