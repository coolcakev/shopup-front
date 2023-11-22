import React, { ChangeEvent, useRef } from 'react';
import './FormInput.scss';
import classNames from 'classnames';

interface PropTypes {
  className?: string;
  placeholder?: string;
  icon?: string;
  type?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = React.forwardRef<HTMLInputElement,PropTypes>((props, ref) => {
  const { placeholder, icon, error, className, ...rest } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const inputFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRef = (el: HTMLInputElement | null) => {
    inputRef.current = el;
    if (ref) {
      if (typeof ref === 'function') {
        ref(el);
      } else if (ref.hasOwnProperty('current')) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = el;
      }
    }
  };

  return (
    <div className={classNames('form-control', className)}  onClick={inputFocus}>
      {icon && <img src={icon} alt="icon" className="form-icon" />}
      <input 
        className="form-input"
        ref={handleRef}
        placeholder={placeholder}  
        {...rest}
      />
      <div className='error-message'>{error}</div>
    </div>
  );
});

export default FormInput;