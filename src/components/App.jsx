import { useState, useEffect } from "react";

import fetchImage from './api'
import Modal from "./Modal";
import Searchbar from "./Searchbar";
import Loader from "./Loader";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import styles from './App.module.css'
import { ToastContainer } from 'react-toastify';


export default function App () {
  const [imagesParameters, setImagesParameters] = useState('');
  const [images, setImages] = useState('');
  const [page, setPage] = useState(1);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [largeImage, setLargeImage] = useState(null);
  const [tags, setTags] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showBtn, setShowBtn] = useState(false);
  const [loaderActive, setLoaderActive] = useState(false);

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = () => {
    setImagesParameters(imagesParameters);
    setPage(1);
    setImages([]);
    
  }

  const toggleModal = (largeImage, tags) => {
    setShowModal(!showModal);
    setLargeImage(largeImage);
    setTags(tags);
  };

  useEffect(() => { 
    if (!imagesParameters) return;

    setLoaderActive(true);
    const getData = async () => {
        try {
        
        const imagesData = await fetchImage(imagesParameters, page);
          if (page === 1) {
            setImages([...imagesData.hits])
          }
          else {
            setImages (prevImages => [...prevImages, ...imagesData.hits])
          }
          setStatus('resolved');
          setShowBtn(true);

          if (imagesData.total === 0) {
            setStatus('rejected');
            setImages([]);
            setShowBtn(false);
            }
        
            if (imagesData.total > 0 && imagesData.hits.length < 12) {             
                setShowBtn(false);
             }                  
      } catch (error) {
        setStatus('rejected');
      } finally {
          setLoaderActive(false);
      }
    }
    getData();

  }, [imagesParameters, page]);

   
  return (
      <div className={styles.app}>
        <Searchbar onSubmit={handleFormSubmit} />
       
        {loaderActive && (
          <Loader />
        )}

        {status === 'rejected' && (<h3 className={styles.h2}>{'Not found'}</h3>)}

        {status === 'resolved' && (
          <ImageGallery images={images} openModal={toggleModal} />         
        )}
        {showBtn && <Button onClick={loadMore} />}

        {showModal && (<Modal 
          onClose={toggleModal}
          largePicture={largeImage}
          tags={tags} />
        )}
        
        <ToastContainer position="top-center"/>
      </div>
    );
 }


