import React from 'react';
import Header from '../../Containers/Header/Header';
import './Homepage.scss';
import SpecialSale from './SpecialSale';
import FeaturedToyCatalog from './FeaturedToyCatalog';
import Lego from './Lego';
import Robots from './Robots';
import ToyManual from './ToyManual';
import Footer from '../../Containers/Footer/Footer';
import CategoryApi from '../../api/CategoryApi';
import { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import banner1 from '../../Assets/banner/1.jpg';
import banner2 from '../../Assets/banner/2.jpg';
import banner3 from '../../Assets/banner/3.jpg';
import banner4 from '../../Assets/banner/4.jpg';
import banner5 from '../../Assets/banner/5.jpg';
import banner6 from '../../Assets/banner/6.jpg';
import { useSelector } from 'react-redux';

export default function Homepage() {
  const [category, setCategory] = useState([]);
  const fetchCategory = async () => {
    const res = await CategoryApi.getAllCategory();
    setCategory(res);
  };
  useEffect(() => {
    fetchCategory();
  }, []);
  const { cart } = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <div>
      <Carousel autoplay autoplaySpeed={3000}>
        <img src={banner1} alt="bn1"></img>
        <img src={banner2} alt="bn1"></img>
        <img src={banner3} alt="bn1"></img>
        <img src={banner4} alt="bn1"></img>
        <img src={banner5} alt="bn1"></img>
        <img src={banner6} alt="bn1"></img>
      </Carousel>
      <SpecialSale />
      <div style={{ marginTop: '50px' }}></div>
      <FeaturedToyCatalog />

      {category.map((cate, i) => {
        return (
          <>
            <div style={{ marginTop: '50px' }} key={cate.id}></div>
            <Lego cate={cate} />
          </>
        );
      })}
      <div style={{ marginTop: '50px' }}></div>
      <ToyManual />
      <div style={{ marginTop: '50px' }}></div>
    </div>
  );
}
