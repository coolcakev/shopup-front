import React from 'react';
import './OrdersListItem.scss';

interface PropTypes {
  firstName: string;
  lastName: string;
  company: string;
  phone: string;
  address: string;
  price: number;
  product: string;
  image: string;
}
const OrdersListItem = (props: PropTypes) => {
  const { firstName, lastName, company, phone, address, price, product, image } = props;
  return (
    <li className='orders-row'>
      <div className='order-client'>
        <div className="order-column">{firstName}</div>
        <div className="order-column">{lastName}</div>
        <div className="order-column">{company}</div>
        <div className="order-column">{phone}</div>
        <div className="order-column">{address}</div>
      </div>
      <div className="order-purchase">
        <img className="order-image" src={image} alt="product" />
        <div className="order-summary">
          <div className="order-price">${price}</div>
          <div className="order-product">{product}</div>
        </div>
      </div>
    </li>
  );
};

export default OrdersListItem;