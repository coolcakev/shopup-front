import React from 'react';
import CloseIcon from '../../../assets/icons/CloseButton.svg';
import './Modal.scss';

interface PropTypes {
  children: React.ReactNode;
  onClose?: () => void;
}

const Modal = (props: PropTypes) => {
  const { children, onClose } = props;
  return (
    <div className='modal'>
      <div className="modal-content">
        {children}
        <div className='close-icon' onClick={onClose}>
          <img src={CloseIcon} alt='Close' />
        </div>
      </div>
    </div>
  );
};

export default Modal;