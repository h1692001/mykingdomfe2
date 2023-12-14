import { Routes, Route } from 'react-router-dom';
import AllProduct from './Components/AllProduct/AllProduct';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';

function GuestApp() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allProduct" element={<AllProduct />} />
      </Routes>
    </div>
  );
}

export default GuestApp;
