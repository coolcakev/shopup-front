import React, { useEffect, useState } from 'react';
import './ProductsPage.scss';
import TemplatePage from '../TemplatePage/TemplatePage';
import ProductCard from '../../widgets/ProductCard/ProductCard';
import PlusButton from '../../shared/components/Button/PlusButton/PlusButton';
import { IProduct, emptyProduct } from '../../entities/Product/product.models';
import ModalProducts from '../../widgets/ModalProducts/ModalProducts';
import ModalEditProduct from '../../widgets/ModalProducts/ModalEditProduct/ModalEditProduct';
import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } from '../../entities/Product/api/productApi';

const ProductsPage = () => {
  const [isNewModalVisible, setNewModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<IProduct>(emptyProduct);
  const [productsBack, setProductsBack] = useState<IProduct[]>([]);
  const { data: productsBackData } = useGetProductsQuery();
  const [addProductMutation] = useAddProductMutation();
  const [deleteProductMutation] = useDeleteProductMutation();

  useEffect(() => {
    if (productsBackData) {
      setProductsBack(productsBackData);
    }
  }, [productsBackData]);

  const deleteProduct = (productId?: string) => {
    const updatedProducts = productsBack.filter((product: IProduct) => product._id !== productId);
    setProductsBack(updatedProducts);
    setEditModalVisible(false);
    productId && deleteProductMutation(productId);
  };

  const toggleNewProductModal = () => {
    setNewModalVisible(!isNewModalVisible);
  };

  const toggleEditProductModal = () => {
    setEditModalVisible(!isEditModalVisible);
  }

  const handleChangeProduct = (product: IProduct) => {
    const updatedProducts = [...productsBack, { _id: productsBack.length.toString(), ...product }];
    setProductsBack(updatedProducts);
  } 

  const handleAddProduct = (product: IProduct) => {
    let formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price.toString());
    if (product.description) formData.append("description", product.description);
    for (let i = 0; i < product.images.length; i++) {
      formData.append("files", product.images[i]);
    };

    handleChangeProduct(product);  
    addProductMutation(formData).unwrap();
    toggleNewProductModal();
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
    setProductsBack(productsBackData);
    toggleEditProductModal();
  };

  const handleOpenEditModal = (product: IProduct) => {
    setProductToEdit(product);
    setEditModalVisible(true);
  }

  return (
    <div className='products-page'>
      <TemplatePage title="Products">
        <div className="products-grid">
          <PlusButton onClick={toggleNewProductModal} />
          {productsBack.map((product: any) => (
            <ProductCard 
              key={product._id} 
              onDelete={() => deleteProduct(product._id)}
              onEditClick={() => handleOpenEditModal(product)}
              {...product} 
            />
          ))}
        </div>
        {isNewModalVisible && 
          <ModalProducts 
            onClose={toggleNewProductModal} 
            onAddProduct={handleAddProduct} 
          />}
        {isEditModalVisible && 
          <ModalEditProduct 
            onClose={() => toggleEditProductModal()} 
            onEditProduct={handleEditProduct} 
            onDeleteProduct={() => deleteProduct(productToEdit._id)}
            productData={productToEdit}
          />}
      </TemplatePage>
    </div>
  );
};

export default ProductsPage;