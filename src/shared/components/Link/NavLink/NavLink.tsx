import React from 'react';
import './NavLink.scss';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface PropTypes {
  label: string,
  path: string
}

const NavLink = ({label, path}: PropTypes) => {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  return (
      <Link to={path} className={classNames('nav-link', {"active": isActive})}>
        {label}
      </Link>
  );
};

export default NavLink;