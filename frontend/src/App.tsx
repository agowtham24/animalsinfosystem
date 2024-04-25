import "./App.css";
import { AdminLogin } from "./admin/login/login";
import { Animals } from "./admin/animals/animals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserLogin } from "./users/login/login";
import { Home } from "./users/home/home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/animals" element={<Animals />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/users/login" element={<UserLogin />} />
        <Route path="/admin/animals" element={<Animals />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
