import React from 'react';
import styles from './Button.module.css'
import PropTypes from 'prop-types';


const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={styles.button}>
    Load more
  </button>
);

Button.propTypes = {
  changePage: PropTypes.func,
}
export default Button;