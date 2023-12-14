import { Link } from 'react-router-dom';
import { formatCurrency } from '../../../utils/convertPrice';
const ProductCard = ({ dt }) => {
  return (
    <Link to={'/detailProduct/' + dt.id} style={{ height: '434px !important', width: '300px !important', border: ' 1px solid #ccc', overflow: ' hidden' }} key={dt.id}>
      <div
        style={{
          backgroundImage: `url(${dt.images[0]})`,
          height: '300px',
          width: '300px',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[1] ? dt.images[1] : dt.images[0]})`)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundImage = `url(${dt.images[0]})`)}
      ></div>
      <div style={{ padding: '10px 10px 0 10px' }}>
        <p
          style={{
            fontSize: '18px',
            textOverflow: 'ellipsis',
            color: '#333',
            margin: '15px 0 10px',
            fontWeight: '600',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            display: '-webkit-box',
          }}
        >
          {dt.name}
        </p>

        <div style={{ fontSize: '10px', color: '#ccc', marginTop: '6px' }}>SKU: {dt.sku}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
          <div style={{ color: '#df494a', fontSize: '16px', fontWeight: '700' }}>{formatCurrency(dt.price - (dt.price * dt.saleOff) / 100)} VNĐ</div>
          <div style={{ color: '#444', fontSize: '12px', textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontWeight: '600' }}>{formatCurrency(dt.price)} VNĐ</div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
