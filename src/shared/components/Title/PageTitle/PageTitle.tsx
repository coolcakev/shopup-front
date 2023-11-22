import React from 'react';
import './PageTitle.scss';

interface PropTypes {
  title: string;
}

const PageTitle = ({ title }: PropTypes) => {
  return (
    <div className='page-title'>
      {title}
    </div>
  );
};

export default PageTitle;