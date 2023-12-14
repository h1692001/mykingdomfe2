import React from 'react';
import './Footer.scss';

export default function Footer() {
  return (
    <div className="Footer_Container">
      <div className="Footer">
        <div className="Footer_Register">
          <div className="Footer_Register_Header">ĐĂNG KÍ NHẬN THÔNG TIN KHUYẾN MÃI</div>
          <div className="Footer_LineTwo">
            <div className="Footer_Register_Input">
              <form id="form">
                <input type="search" id="query" name="q" placeholder="Nhập địa chỉ email … " className="Search_Input" />
                <button className="btn-search">
                  <i class="fa fa-envelope-o" aria-hidden="true"></i>
                </button>
              </form>
            </div>
            <div className="Footer_Minitor">
              <div className="Footer_Minitor_Header">THEO DÕI MKD</div>
              <div className="Footer_Minitor_FB"></div>
              <div className="Footer_Minitor_INS"></div>
              <div className="Footer_Minitor_YT"></div>
            </div>
          </div>
        </div>
        <div className="Footer_Content">
          <div className="Footer_Hotline">
            <div className="Footer_Hotline_Header">HOTLINE CHĂM SÓC KHÁCH HÀNG</div>
            <div className="Footer_Hotline_Content_PhoneNumber">19001208</div>
            <div className="Footer_Hotline_Content">Từ thứ Hai đến thứ Bảy (08:00 - 17:00)</div>
            <div className="Footer_Hotline_Content">Chủ nhật (08:00 - 12:00)</div>
            <div className="Footer_Hotline_Content_Email">
              {' '}
              <i class="fa fa-envelope" aria-hidden="true"></i>
              <span>hotro@mykingdom.com.vn</span>
            </div>
          </div>
          <div className="Footer_Policy">
            <div className="Footer_Policy_Header">ĐIỀU KHOẢN & CHÍNH SÁCH</div>
            <div className="Footer_Policy_Content">- Chính sách giao hàng</div>
            <div className="Footer_Policy_Content">- Chính sách tích lũy điểm</div>
            <div className="Footer_Policy_Content">- Điều khoản điều kiện</div>
          </div>
          <div className="Footer_Support">
            <div className="Footer_Support_Header">HỖ TRỢ KHÁCH HÀNG</div>
            <div className="Footer_Support_Content">- Chính sách bảo mật</div>
            <div className="Footer_Support_Content">- Chính sách bảo hành đổi trả hàng hóa</div>
            <div className="Footer_Support_Content">- Chính sách thanh toán</div>
            <div className="Footer_Support_Image"></div>
          </div>
          <div className="Footer_Address">
            <div className="Footer_Address_Header">ĐỊA CHỈ CỬA HÀNG</div>
            <div className="Footer_Address_Image"></div>
          </div>
        </div>
        <div className="Footer_NameCompany">
          <div className="Footer_NameCompany_Header">Công ty cổ phần Việt Tinh AnhSố ĐKKD: 0309132354 do sở kế hoạch và đầu tư cấp ngày 14/07/09</div>
          <div className="Footer_NameCompany_Address">Địa chỉ: 33-35 đường số D4, khu Đô thị mới Him Lam, Phường Tân Hưng, Quận 7, TP. Hồ Chí MinhĐiện thoại: 0286.2638.600</div>
        </div>
      </div>
    </div>
  );
}
