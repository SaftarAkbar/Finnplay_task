import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from './pages/Login'
import UserPanel from "./pages/UserPanel"
import Navigation from "./ui/common/Navigation"



const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="login" element={<Login />} />
        <Route path="userpanel" element={<UserPanel/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
