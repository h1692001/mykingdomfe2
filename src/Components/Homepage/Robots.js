import React from 'react';
import './Robots.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: '#ccc', fontSize: '20px' }} onClick={onClick} />;
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: 'block', background: '#ccc', fontSize: '20px' }} onClick={onClick} />;
}
export default function Robots() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="Robots_Container">
      <div className="Robots">
        <div className="Robots_Header">
          <div className="Robots_Header_Title">BÚP BÊ - ROBOTS</div>
          <div className="Robots_Header_Content">BARBIE</div>
          <div className="Robots_Header_Content">LOL SURPRISE</div>
          <div className="Robots_Header_Content">MINIFORCE</div>
          <div className="Robots_Header_Content">TOBOT</div>
        </div>
        <div style={{ marginTop: '20px' }}></div>
        <div className="Robots_Content">
          <Slider {...settings}>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i className="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i class="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i class="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i class="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i class="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i class="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
            <div className="Robots_ProductItem">
              <div className="Robots_ProductItem_Image"></div>
              <div className="Robots_ProductItem_NameProduct">Robot chú chó tinh nghịch</div>
              <div className="Robots_ProductItem_ProductCode">SKU: VT18012</div>
              <div className="Robots_ProductItem_Promotion">
                <i class="fa fa-gift" aria-hidden="true"></i>
                Sản phẩm có khuyến mãi <span>xem chi tiết</span>
              </div>
              <div className="Robots_ProductItem_Price">
                <div className="Robots_ProductItem_CurrentPrice">487,000 VNĐ</div>
                <div className="Robots_ProductItem_PreviousPrice">649,000 VNĐ</div>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
