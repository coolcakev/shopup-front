import React from 'react';
import './ProductCard.scss';
import ProductImage from '../../shared/components/Image/ProductImage/ProductImage';

interface PropTypes {
  image: string;
  name: string;
  price: number;
  onDelete: () => void; 
  onEditClick: () => void;
}

const ProductCard = (props: PropTypes) => {
  const { image, name, price, onDelete, onEditClick } = props;

  return (
    <div className='product-card'>
      <ProductImage 
        image={image}
        onDelete={onDelete} 
        onEditClick={onEditClick} 
      />
      <div className="product-details">
        <div className='product-name'>{name}</div>
        <div className='product-price'>${price}</div>
      </div>
    </div>
  );
};

export default ProductCard;