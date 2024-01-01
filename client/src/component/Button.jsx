import React from 'react'
import { Link } from 'react-router-dom';
import styles from '../style/buttons.module.css';

export const Button = ({
    text,
    onClick,
    link,
    variant,
    size,
    isDisabled,
    ...props
}) => {
    
    const buttonClasses = `${styles.button} ${styles[size]} ${styles[variant]}`;

    return (
        <React.Fragment>
            <Link to={link}>
                <div>
                    <button
                    disabled={isDisabled}
                    onClick={onClick}
                    {...props}
                    className={buttonClasses}
                    >
                        {text}
                    </button>
                </div>
            </Link>
        </React.Fragment>
    )

}