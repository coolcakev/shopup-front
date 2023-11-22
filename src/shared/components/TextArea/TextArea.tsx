import React, { forwardRef } from 'react';
import './TextArea.scss';
import classNames from 'classnames';

interface PropTypes {
  className?: string;
  placeholder?: string;
}
const TextArea = forwardRef<HTMLTextAreaElement, PropTypes>((props: PropTypes, ref: any) => {
  const { className, placeholder, ...rest } = props;
  return (
    <textarea className={classNames('textarea', className)} placeholder={placeholder} ref={ref} {...rest} />
  );
});

export default TextArea;