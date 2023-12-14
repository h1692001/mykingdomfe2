import React from 'react';
import { Carousel } from 'antd';
import ProductApi from '../../api/ProductApi';
import { useEffect, useState } from 'react';
import './SpecialSale.scss';
import { formatCurrency } from '../../utils/convertPrice';
import { Link } from 'react-router-dom';
import { Spin } from 'antd';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block', fontSize: '20px' }} onClick={onClick}>
      hi
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: 'block', fontSize: '20px' }} onClick={onClick}>
      hi
    </div>
  );
}
export default function SpecialSale() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await ProductApi.getBestSaleOff();
      setData(res);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="SpecialSale_Container">
      <div className="SpecialSale">
        <h2 style={{ color: '#444', fontSize: '25px', fontWeight: '600', margin: '20px 0' }}>GIẢM GIÁ ĐẶC BIỆT</h2>
        <div className="SpecialSale_Product">
          <Spin spinning={isLoading}>
            <Carousel autoplay dotPosition={'bottom'} slidesToShow={data.filter((ss) => ss.isHidden !== true).length > 4 ? 4 : data.filter((ss) => ss.isHidden !== true).length}>
              {data.map((dt) => {
                if (dt?.isHidden !== true)
                  return (
                    <Link to={'/detailProduct/' + dt.id} className="SpecialSale_ProductItem" key={dt.id}>
                      <div
                        className="SpecialSale_ProductItem_Image"
                        style={{
                          backgroundImage: `url(${dt.images[0]})`,
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[1] ? dt.images[1] : dt.images[0]})`)}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[0]})`)}
                      ></div>
                      <div style={{ padding: '10px 10px 0 10px' }}>
                        <div className="SpecialSale_ProductItem_NameProduct">{dt.name}</div>
                        <div className="SpecialSale_ProductItem_ProductCode">SKU: {dt.sku}</div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                          <div className="SpecialSale_ProductItem_Price">{formatCurrency(dt.price - (dt.price * dt.saleOff) / 100)} VNĐ</div>
                          <div style={{ color: '#444', fontSize: '12px', textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontWeight: '600' }}>{formatCurrency(dt.price)} VNĐ</div>
                        </div>
                      </div>
                    </Link>
                  );
              })}
            </Carousel>
          </Spin>
        </div>
      </div>
    </div>
  );
}
