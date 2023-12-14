import React from 'react';
import Header from '../../Containers/Header/Header';
import Footer from '../../Containers/Footer/Footer';
import './Register.scss';
import { useState } from 'react';
import { Formik, Form, Field, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Input, Spin, DatePicker } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import AuthApi from '../../api/AuthApi';
import Swal from 'sweetalert2';

export default function Register() {
  const SignupSchema = Yup.object().shape({
    fullname: Yup.string().min(2, 'Quá ngắn').max(50, 'Tối da 50 kí tự').required('Không để trống'),
    dob: Yup.string().required('Không để trống'),
    phone: Yup.string().required('Không để trống'),
    gender: Yup.string().required('Không để trống'),
    email: Yup.string().email('Email không hợp lệ').required('Không để trống'),
    password: Yup.string().required('Không để trống'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
  });
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      fullname: '',
      dob: '',
      phone: '',
      gender: '',
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (e) => {
      try {
        setIsLoading(true);
        const res = await AuthApi.register(e);
        Swal.fire('Yeah!', 'Đăng kí tài khoản thành công', 'success');
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
        Swal.fire('Oops!', e.response.data, 'error');
      }
    },
  });
  return (
    <div>
      <Header />
      <div className="Register_Container">
        <div className="Register">
          <h3 className="Register_Title">ĐĂNG KÝ TÀI KHOẢN CỦA BẠN</h3>
          <div className="MemberName relative">
            <div className="MemberName_Title">Họ tên thành viên</div>
            <Input type="text" placeholder="Nhập họ tên" className="Input" id="fullname" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.fullname && formik.errors.fullname ? <div className="error absolute right-[-220px]">{formik.errors.fullname}</div> : null}
          </div>
          <div></div>
          <div className="Birthday relative">
            <div className="MemberName_Title">Ngày sinh</div>
            <Input type="text" placeholder="Nhập ngày sinh" id="dob" value={formik.values.dob} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.dob && formik.errors.dob ? <div className="error absolute right-[-220px]">{formik.errors.dob}</div> : null}
          </div>
          <div className="PhoneNumber relative">
            <div className="MemberName_Title">Số điện thoại</div>
            <Input type="text" placeholder="Nhập số điện thoại" id="phone" className="Input" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.phone && formik.errors.phone ? <div className="error absolute right-[-220px]">{formik.errors.phone}</div> : null}
          </div>
          <div className="Gender relative">
            <div className="MemberName_Title">Giới tính</div>
            <Input type="text" placeholder="Nhập giới tính" id="gender" className="Input" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.gender && formik.errors.gender ? <div className="error absolute right-[-220px]">{formik.errors.gender}</div> : null}
          </div>
          <div className="Email relative">
            <div className="MemberName_Title">Địa chỉ email</div>
            <Input type="text" placeholder="Nhập email" id="email" className="Input" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.email && formik.errors.email ? <div className="error absolute right-[-220px]">{formik.errors.email}</div> : null}
          </div>
          <div className="Password relative">
            <div className="MemberName_Title">Mật khẩu</div>
            <Input type="password" placeholder="Nhập mật khẩu" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.password && formik.errors.password ? <div className="error absolute right-[-220px]">{formik.errors.password}</div> : null}
          </div>
          <div className="EnterThePassword relative">
            <div className="MemberName_Title">Nhập lại mật khẩu</div>
            <Input type="password" placeholder="Xác nhận mật khẩu" id="password2" value={formik.values.password2} onChange={formik.handleChange} onBlur={formik.handleBlur} />
            {formik.touched.password2 && formik.errors.password2 ? <div className="error absolute right-[-220px] ">{formik.errors.password2}</div> : null}
          </div>

          <Spin spinning={isLoading}>
            <button className="action submit btn btn-primary" onClick={() => formik.handleSubmit()}>
              ĐĂNG KÝ
            </button>
          </Spin>
        </div>
      </div>

      <Footer />
    </div>
  );
}
