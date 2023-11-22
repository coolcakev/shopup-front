import React from 'react';
import './CustomersListItem.scss';

interface PropTypes {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
}
const CustomersListItem = (props: PropTypes) => {
  const { firstName, lastName, companyName, email } = props;
  return (
    <li className='customers-row'>
      <div className="customer-column">{firstName}</div>
      <div className="customer-column">{lastName}</div>
      <div className="customer-column">{companyName}</div>
      <div className="customer-column customer-email">
        <a href={`mailto:${email}`}>{email}</a>
      </div>
    </li>
  );
};

export default CustomersListItem;