import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css'
import PropTypes from 'prop-types';



const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {

    componentDidMount() {
        // console.log('Modal componentDidMount')

        window.addEventListener('keydown',  this.handleKeyDown)
    }
    componentWillUnmount() {
        // console.log('Modal componentWillUnmount')
        window.removeEventListener('keydown', this.handleKeyDown)
    }

    handleKeyDown = e => {
            console.log(e.code)
            if (e.code === 'Escape') {
                // console.log("ESC Закрыть модалку")
                this.props.onClose();
            }
        }

    handleBackdropClick = event => {
        // console.log('Клик на бекдроп');

        // console.log('currentTarget:', event.currentTarget);
        // console.log('target:', event.target);

        if (event.currentTarget === event.target) {
            this.props.onClose();
        }

    }

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }));
    }

    render() {
        const { largeImageURL, tags } = this.props;
        return createPortal(
            <div className={styles.overlay} onClick={this.handleBackdropClick}>
                <div className={styles.modal}>
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>, modalRoot, 
        )
    };
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  tags: PropTypes.array,
  largeImageURL: PropTypes.string,
};