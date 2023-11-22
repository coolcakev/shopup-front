import React from 'react';
import './NavButton.scss';

interface PropTypes {
  label: string;
  onClick?: () => void;
}

const NavButton = (props: PropTypes) => {
  const { label, onClick } = props;
  return (
    <button className='nav-button' onClick={onClick}>{label}</button>
  );
};

export default NavButton;