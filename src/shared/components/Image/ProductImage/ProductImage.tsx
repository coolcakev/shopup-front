import React from 'react';
import './ProductImage.scss';
import Trash from '../../../../assets/icons/Trash.svg';
import Edit from '../../../../assets/icons/Edit.svg';

interface PropTypes {
  image: File | string;
  onDelete: () => void;
  onEditClick: () => void;
}

const ProductImage = (props: PropTypes) => {
  const { image, onDelete, onEditClick } = props;
  
  const handleDeleteClick = () => {
    onDelete();
  };

  const imageUrl: string = image instanceof File ? URL.createObjectURL(image) : image;

  return (
    <div className='product-image-container'>
      <img src={imageUrl} alt="product" className="img-product" />
      <div className='icon-container icon-trash' onClick={handleDeleteClick}>
        <img src={Trash} alt="trash" className="img-trash" />
      </div>
      <div className='icon-container icon-edit'>
        <img src={Edit} alt="edit" className="img-edit" onClick={onEditClick} />
      </div>
    </div>
  );
};

export default ProductImage;