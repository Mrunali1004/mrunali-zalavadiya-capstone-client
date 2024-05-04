import "./App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login/Login";
import Signup from "./component/Signup/Signup";
import Home from "./page/Home/Home";
import Header from "./component/Header/Header";
import Footer from "./component/Footer/Footer";
import AddNote from "./component/AddNote/AddNote";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { updateToken } from "./utils/data.service";



function App() {

  useEffect(() => {
    updateToken()
  },[])
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="/edit/:id" element={<AddNote />} /> 
        <Route path="/" element={<Home /> }  />
      </Routes>
      <Footer />
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
