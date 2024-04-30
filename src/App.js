import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Home from "./page/Home/Home";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import AddNote from "./component/AddNote/AddNote";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addnote" element={<AddNote />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
