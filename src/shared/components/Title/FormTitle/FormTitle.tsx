import React from 'react';
import './FormTitle.scss';

interface PropTypes {
  title: string;
}

const FormTitle = ({ title }: PropTypes) => {
  return (
    <div className='form-title'>
      {title}
    </div>
  );
};

export default FormTitle;