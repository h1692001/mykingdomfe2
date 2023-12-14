import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/convertPrice';
import '../../Homepage/SpecialSale.scss';
const ProductCard = ({ dt }) => {
  return (
    <Link to={'/detailProduct/' + dt.id} style={{ height: '434px !important', width: '300px !important', border: ' 1px solid #ccc', overflow: ' hidden' }} key={dt.id}>
      <div
        className="SpecialSale_ProductItem_Image"
        style={{
          backgroundImage: `url(${dt.images[0]})`,
          height: '313px',
          width: '313px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[1] ? dt.images[1] : dt.images[0]})`)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[0]})`)}
      ></div>
      <div style={{ padding: '10px 10px 0 10px' }}>
        <div
          className="SpecialSale_ProductItem_NameProduct"
          style={{
            color: '#444',
            fontWeight: '600',
            fontSize: '16px',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '2',
          }}
        >
          {dt.name}
        </div>
        <div className="SpecialSale_ProductItem_ProductCode" style={{ fontSize: '10px', color: '#ccc', marginTop: '6px' }}>
          SKU: {dt.sku}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <div className="SpecialSale_ProductItem_Price" style={{ color: '#df494a', fontSize: '16px', fontWeight: '700' }}>
            {formatCurrency(dt.price - (dt.price * dt.saleOff) / 100)} VNĐ
          </div>
          <div style={{ color: '#444', fontSize: '12px', textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontWeight: '600' }}>{formatCurrency(dt.price)} VNĐ</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
