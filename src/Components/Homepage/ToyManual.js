import React from 'react';
import './ToyManual.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link, useNavigate } from 'react-router-dom';
import PostApi from '../../api/PostApi';
import { useEffect, useState } from 'react';

export default function ToyManual() {
  const navigate = useNavigate();
  function createMarkup(des) {
    return { __html: des };
  }
  const [post, setPost] = useState([]);
  const fetchPost = async () => {
    try {
      const res = await PostApi.getAll();
      setPost(res);
    } catch (e) {}
  };
  useEffect(() => {
    fetchPost();
  }, []);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: post?.length > 3 ? 3 : post?.length,
    slidesToScroll: 1,
  };

  return (
    <div className="ToyManual_Container">
      <div className="ToyManual">
        <div className="ToyManual_Header">
          <h2 style={{ fontWeight: '600', color: '#444', fontSize: '25px' }}>CẨM NANG ĐỒ CHƠI</h2>
          <h3
            className="ToyManual_Header_Title"
            style={{ fontSize: '20px', fontWeight: '600' }}
            onClick={() => {
              navigate('/post');
            }}
          >
            >>XEM TẤT CẢ
          </h3>
        </div>
        <div style={{ marginTop: '20px' }}></div>
        <div className="ToyManual_Content">
          <Slider {...settings} autoplay autoplaySpeed={2000}>
            {post?.map((pt) => {
              return (
                <Link to={'/postDetail/' + pt?.id} className="ToyManual_ProductItem">
                  <img src={pt.thumb} style={{ height: '260px', objectFit: 'cover', width: '100%' }} alt="tb"></img>
                  <div style={{ padding: '20px' }}>
                    <div
                      className="ToyManual_ProductItem_NameProduct"
                      style={{
                        fontSize: '18px',
                        textOverflow: 'ellipsis',
                        color: '#333',
                        margin: '15px 0 10px',
                        fontWeight: '600',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        display: '-webkit-box',
                      }}
                    >
                      {pt.title}
                    </div>
                    <div className="ToyManual_ProductItem_Content">{pt.des}</div>
                    <div className="ToyManual_ProductItem_SeeMore">XEM THÊM</div>
                  </div>
                </Link>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
}
