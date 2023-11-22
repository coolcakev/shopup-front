import React from 'react';
import ModalProducts from '../ModalProducts';
import './ModalEditProduct.scss';
import { IProduct } from '../../../entities/Product/product.models';

interface PropTypes {
  onClose?: () => void;
  onEditProduct?: (product: IProduct) => void;
  onDeleteProduct?: (product: IProduct) => void;
  productData?: IProduct;
}

const ModalEditProduct = (props: PropTypes) => {
  const { onClose, onEditProduct, onDeleteProduct, productData } = props;
  return (
    <ModalProducts 
      onClose={onClose} 
      onEditProduct={onEditProduct} 
      onDelete={onDeleteProduct} 
      productToEdit={productData}
    />
  );
};

export default ModalEditProduct;