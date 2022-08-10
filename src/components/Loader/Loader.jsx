import React from 'react';
// import styles from './Loader.module.css';
import { Rings } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export default function Loader() {
    return (<div >
        <Rings
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
        />
        ;
    </div>
    );
}

Loader.propTypes = {
  query: PropTypes.string,
};