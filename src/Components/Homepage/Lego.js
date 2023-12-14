import React from 'react';
import './Lego.scss';
import ProductApi from '../../api/ProductApi';
import { useEffect, useState } from 'react';
import { Carousel, Spin } from 'antd';
import './SpecialSale.scss';
import { formatCurrency } from '../../utils/convertPrice';
import { Link } from 'react-router-dom';
import { CiHeart } from 'react-icons/ci';
import ProductCard from '../ManagementPage/Product/ProductCard';

export default function Lego({ cate }) {
  const [data, setData] = useState([]);
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const res = await ProductApi.getByCategory(cate.id);
      setData(res);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="Lego_Container">
      <div className="Lego">
        <div className="Lego_Header">
          <div className="Lego_Header_Title">{cate.name}</div>
          {cate.brands?.map((br, i) => {
            if (i < 5) return <div className="Lego_Header_NinjaGo">{br.name}</div>;
          })}
        </div>
        <div style={{ marginTop: '20px' }}></div>
        <div className="SpecialSale_Container">
          <div className="SpecialSale">
            <div className="SpecialSale_Product">
              <Spin spinning={isLoading}>
                <Carousel autoplay dotPosition={'bottom'} slidesToShow={data.filter((ss) => ss.isHidden !== true).length > 4 ? 4 : data.filter((ss) => ss.isHidden !== true).length}>
                  {data.map((dt) => {
                    if (dt?.isHidden !== true)
                      return (
                        <Link to={'/detailProduct/' + dt.id} className="SpecialSale_ProductItem" key={dt.id}>
                          <div
                            className="SpecialSale_ProductItem_Image relative"
                            style={{
                              backgroundImage: `url(${dt.images[0]})`,
                            }}
                            onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[1] ? dt.images[1] : dt.images[0]})`)}
                            onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[0]})`)}
                          ></div>
                          <></>
                          <div style={{ padding: '10px 10px 0 10px' }}>
                            <div className="SpecialSale_ProductItem_NameProduct">{dt.name}</div>
                            <div className="SpecialSale_ProductItem_ProductCode">
                              <p>SKU: {dt.sku}</p>
                            </div>
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
      </div>
    </div>
  );
}
