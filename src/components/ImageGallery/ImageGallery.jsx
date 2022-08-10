import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css'
import ImageGalleryItem from 'components/ImageGalleryItem';

export default function ImageGallery({ images, openModal }) {
  return (
        <ul className={styles.gallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={openModal}
              />
          ))}
        </ul>   
  )
}
    
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})),
  openModal: PropTypes.func.isRequired,
};  