import React from 'react';
import styles from '../style/buttons.module.css';

export const Button = ({
  isDisabled,
  onClick,
  size,
  variant,
  isLoading,
  text,
  ...props
}) => {
  const buttonClasses = `${styles.button} ${styles[size]} ${styles[variant]} ${isLoading ? styles.loading : ''} ${props.className || ''}`;

  return (
    <button disabled={isDisabled} onClick={onClick} {...props} className={buttonClasses}>
      <React.Fragment>
        <p>{text}</p>
      </React.Fragment>
    </button>
  );
};
