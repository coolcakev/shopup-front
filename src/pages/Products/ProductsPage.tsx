import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import {IProduct, emptyProduct, GetAllProductResponse} from '../../entities/Product/product.models';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';
import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } from '../../entities/Product/api/productApi';

const ProductsPage = () => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<GetAllProductResponse>(emptyProduct);
  const { data: productsBackData } = useGetProductsQuery();
  const [addProductMutation] = useAddProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();

  const deleteProduct = (productId?: string) => {
    setEditModalVisible(false);
    productId && deleteProductMutation(productId);
  };

  const toggleNewProductModal = () => {
    setNewModalVisible(!isNewModalVisible);
  };

  const toggleEditProductModal = () => {
    setEditModalVisible(!isEditModalVisible);
  }

  const handleEditProduct = async (product: IProduct) => {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    if (product.description) formData.append("description", product.description);
    for (let i = 0; i < product.images.length; i++) {
      formData.append("files", product.images[i]);
    };
    formData.append("productId", productToEdit._id!);
    addProductMutation(formData).unwrap();
    toggleEditProductModal();
  };

  const handleOpenEditModal = (product: GetAllProductResponse) => {
    setProductToEdit(product);
    setEditModalVisible(true);
  }

  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton onClick={toggleNewProductModal} />
          {productsBackData?.map((product) => (
            <ProductCard 
              key={product._id} 
              onDelete={() => deleteProduct(product._id)}
              onEditClick={() => handleOpenEditModal(product)}
              image={product.images[0]?.link}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
        {isNewModalVisible && 
          <ModalProducts 
            onClose={toggleNewProductModal}
          />}
        {isEditModalVisible &&
            <ModalProducts
              onClose={() => toggleEditProductModal()}
              productToEdit={productToEdit}
            />
          }
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;