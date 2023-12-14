import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GuestApp from './GuestApp';
import { useNavigate } from 'react-router-dom';
import { logout, getCurrentUser } from './store/actions/authAction';
import { useDispatch, useSelector } from 'react-redux';
import Public from './pages/public/Public';
import Home from './pages/public/Home/Home';
import Homepage from './Components/Homepage/Homepage';
import { useEffect } from 'react';
import UserApi from './api/UserApi';
import Dashboard from './Components/ManagementPage/Dashboard/Dashboard';
import ManageBrand from './pages/admin/ManageBrand';
import ManageProduct from './pages/admin/ManageProduct';
import ManageCategory from './pages/admin/ManageCategory';
import CreateProduct from './pages/admin/CreateProduct';
import DetailProduct from './pages/public/DetailProduct/DetailProduct';
import AllProduct from './Components/AllProduct/AllProduct';
import CartApi from './api/CartApi';
import Cart from './pages/public/Cart/Cart';
import { fetchCart } from './store/actions/cartAction';
import Payment from './pages/public/Payment/Payment';
import ManageBill from './pages/admin/ManageBill';
import ManageSale from './pages/admin/ManageSale';
import UserProfile from './pages/public/User/UserProfile';
import UpdateProduct from './pages/admin/UpdateProduct';
import Statistic from './pages/admin/Statistic';
import PaymentSuccess from './pages/public/Payment/PaymentSuccess';
import ManagePost from './pages/admin/ManagePost';
import CreatePost from './pages/admin/CreatePost';
import PostList from './pages/public/Post/PostList';
import PostDetail from './pages/public/Post/PostDetail';
import UpdatePost from './pages/admin/UpdatePost';
import VoteProduct from './pages/public/User/VoteProduct';
import ManageEmployee from './pages/admin/ManageEmployee';

function App() {
  const { isLoggedIn, userCurrent } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkAccess = async () => {
    try {
      const res = await UserApi.getCurrentUser();
      dispatch(getCurrentUser(res));
      const res2 = await CartApi.getCart(res?.id);
      dispatch(fetchCart(res2));
    } catch (err) {
      navigate('/');
      dispatch(logout());
    }
  };
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('persist:auth'))?.isLoggedIn === 'true') {
      checkAccess();
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Public></Public>}>
          <Route path="" element={<Homepage></Homepage>}></Route>
          <Route path="detailProduct/:id" element={<DetailProduct></DetailProduct>}></Route>
          <Route path="category" element={<AllProduct></AllProduct>}></Route>
          <Route path="cart" element={<Cart></Cart>}></Route>
          <Route path="payment" element={<Payment></Payment>}></Route>
          <Route path="paymentSuccess" element={<PaymentSuccess></PaymentSuccess>}></Route>
          <Route path="profile" element={<UserProfile></UserProfile>}></Route>
          <Route path="vaoteProduct" element={<VoteProduct></VoteProduct>}></Route>
          <Route path="post" element={<PostList></PostList>}></Route>
          <Route path="postDetail/:id" element={<PostDetail></PostDetail>}></Route>
        </Route>
        <Route path="/admin/*" element={<Dashboard />}>
          <Route index element={<ManageBrand />} />
          <Route path="createProduct" element={<CreateProduct></CreateProduct>}></Route>
          <Route path="updateProduct/:id" element={<UpdateProduct></UpdateProduct>}></Route>
          <Route path="manageproduct" element={<ManageProduct></ManageProduct>}></Route>
          <Route path="managecategory" element={<ManageCategory></ManageCategory>}></Route>
          <Route path="managebill" element={<ManageBill></ManageBill>}></Route>
          <Route path="managesale" element={<ManageSale></ManageSale>}></Route>
          <Route path="managepost" element={<ManagePost></ManagePost>}></Route>
          <Route path="statistic" element={<Statistic></Statistic>}></Route>
          <Route path="updatePost/:id" element={<UpdatePost></UpdatePost>}></Route>
          <Route path="createPost" element={<CreatePost></CreatePost>}></Route>
          <Route path="manageNV" element={<ManageEmployee></ManageEmployee>}></Route>
        </Route>
        <Route path="/guest/*" element={<GuestApp />} />
      </Routes>
    </>
  );
}

export default App;
