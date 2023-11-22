import React from 'react';
import './ModalCustomers.scss';
import SubmitButton from '../../shared/components/Button/SubmitButton/SubmitButton';
import FormInput from '../../shared/components/Input/FormInput/FormInput';
import Modal from '../../shared/components/Modal/Modal';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ICustomer } from '../../entities/User/user.models';

interface PropTypes {
  onClose: () => void;
  onAddCustomer: (customer: ICustomer) => void;
}

const yupSchema = yup.object({
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  companyName: yup.string().required('Company is required'),
});

type YupSchemaType = yup.InferType<typeof yupSchema>;

const ModalCustomers = (props: PropTypes) => {
  const { onClose, onAddCustomer } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YupSchemaType>({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      companyName: '',
    },
  });

  const onSubmitHandler: SubmitHandler<YupSchemaType> = async (data) => {
    try {
      onAddCustomer(data);
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Modal onClose={onClose}>
      <form className='modal-customers' onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="modal-inputs">
          <FormInput
            placeholder='Email'
            {...register('email')}
            error={errors.email?.message}
          />
          <FormInput
            placeholder='First Name'
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <FormInput
            placeholder='Last Name'
            {...register('lastName')}
            error={errors.lastName?.message}
          />
          <FormInput
            placeholder='Company'
            {...register('companyName')}
            error={errors.companyName?.message}
          />
        </div>  
        <SubmitButton label="Add New" />
      </form>
    </Modal>
  );
};

export default ModalCustomers;