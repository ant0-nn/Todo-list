import { useEffect } from "react";
import { getMe } from "./redux/fuatures/auth/authSlice";
import { useDispatch } from "react-redux";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./styles/style.scss";
import Header from "./components/Header";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegisterPage/>}/>
      </Routes>
      <ToastContainer/>
    </Router>
  )
}

export default App
