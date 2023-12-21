import React from 'react';
import './FeaturedToyCatalog.scss';
import CategoryApi from '../../api/CategoryApi';
import { useEffect, useState } from 'react';

export default function FeaturedToyCatalog() {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const res = await CategoryApi.getAllCategory();
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="FeaturedToyCatalog_Container">
      <div className="FeaturedToyCatalog">
        <h2 style={{ color: '#444', fontSize: '25px', fontWeight: '600', margin: '20px 0' }}>DANH MỤC ĐỒ CHƠI NỔI BẬT</h2>
        <div className="Category">
          {data.map((cate, i) => {
            if (i < 6 && cate?.hidden === false) {
              return (
                <div className="FeaturedToyCatalog_Content" key={cate.id}>
                  <div className="FeaturedToyCatalog_Content_Image" style={{ backgroundImage: `url(${cate.image})` }}></div>
                  <div className="FeaturedToyCatalog_Content_Name">{cate.name}</div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
