import React from 'react';
import styles from '../style/buttons.module.css';
import { Link } from 'react-router-dom';

export const Button = ({
  isDisabled,
  onClick,
  size,
  variant,
  isLoading,
  text,
  link,
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[size]} ${styles[variant]} ${isLoading ? styles.loading : ''} ${props.className || ''}`;

  return (
    <Link to={link || null}>
      <button disabled={isDisabled} onClick={onClick} {...props} className={buttonClasses}>
      <React.Fragment>
        <p>{text}</p>
      </React.Fragment>
    </button>
    </Link>
  );
};
