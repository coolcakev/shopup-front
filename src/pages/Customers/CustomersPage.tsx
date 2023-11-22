import React, { useEffect, useState } from 'react';
import TemplatePage from '../TemplatePage/TemplatePage';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import './CustomersPage.scss';
import CustomersListItem from '../../shared/components/ListItem/CustomersListItem/CustomersListItem';
import ModalCustomers from '../../widgets/ModalCustomers/ModalCustomers';
import { ICustomer } from '../../entities/User/user.models';
import { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } from '../../entities/User/api/userApi';

const CustomersPage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const { data: customersBackData } = useGetUsersQuery();
  const [createUser] = useCreateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();

  useEffect(() => {
    if (customersBackData) {
      setCustomers(customersBackData);
    }
  }, [customersBackData]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddCustomer = (customer: ICustomer) => {
    const updatedCustomers = [...customers, { id: customers.length + 1001, ...customer }];
    setCustomers(updatedCustomers);
    createUser(customer);
  };

  const handleDeleteCustomer = (customerId?: string) => {
    const updatedCustomers = customers.filter((customer: ICustomer) => customer._id !== customerId);
    setCustomers(updatedCustomers);
    customerId && deleteUserMutation(customerId);
  }

  return (
    <div className='customers-page'>
      <TemplatePage title="Customers">
        <div className="customers-button">
          <SubmitButton label="Add new" onClick={toggleModal} />
        </div>
        <ul className='customers-list'>
          <li className="customers-headings-row">
            <div className="customer-heading">First Name</div>
            <div className="customer-heading">Last Name</div>
            <div className="customer-heading">Company</div>
            <div className="customer-heading">Email</div>
          </li>
          {customers.map((customer)=>(
            <CustomersListItem key={customer._id} {...customer} />
          ))}
        </ul>
        {isModalVisible && <ModalCustomers onClose={toggleModal} onAddCustomer={handleAddCustomer} />}
      </TemplatePage>
    </div>
  );
};

export default CustomersPage;