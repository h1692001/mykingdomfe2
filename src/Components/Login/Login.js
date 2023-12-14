import React, { useEffect, useState } from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../../Containers/Footer/Footer';
import './Login.scss';
import { useNavigate } from 'react-router-dom';
import UserApi from '../../api/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import { login } from '../../store/actions/authAction';
import { Spin } from 'antd';
import Swal from 'sweetalert2';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, []);
  const Register = () => {
    navigate('/guest/register');
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await UserApi.login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      dispatch(login(res));
      setTimeout(() => {
        window.location.href = '/';
      }, 300);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      Swal.fire('Error', e?.response?.data?.message ? e?.response?.data?.message : 'Network error', 'error');
    }
  };
  return (
    <div>
      <Header />
      <div className="Login_Container">
        <div className="Login">
          <h3 className="Login_Title">Đăng nhập để mua hàng và sử dụng những tiện ích mới nhất từ Mykingdom</h3>
          <h3 className="Login_Title">
            Bạn chưa có tài khoản?<span onClick={Register}>ĐĂNG KÝ TÀI KHOẢN</span>{' '}
          </h3>
          <div className="Email">
            <div className="MemberName_Title">Địa chỉ email </div>
            <input type="text" placeholder="Nhập email" className="Input" ref={emailRef} />
          </div>
          <div className="Password">
            <div className="MemberName_Title">Mật khẩu</div>
            <input type="text" placeholder="Nhập mật khẩu" className="Input" ref={passwordRef} />
          </div>
          <div className="ForgetPassword">
            Quên mật khẩu? Khôi phục mật khẩu <span>tại đây</span>
          </div>
          <Spin spinning={isLoading}>
            <button
              className="action submit btn btn-primary"
              onClick={() => {
                handleLogin();
              }}
            >
              Đăng nhập
            </button>
          </Spin>
        </div>
      </div>
      <Footer />
    </div>
  );
}
