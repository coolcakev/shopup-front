import React from 'react';
import './SubmitButton.scss';

interface PropTypes {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const SubmitButton = (props: PropTypes) => {
  const { label, onClick, type } = props;

  return (
    <button 
      className='submit-button' 
      onClick={onClick}
      type={type}
    >{label}</button>
  );
};

export default SubmitButton;