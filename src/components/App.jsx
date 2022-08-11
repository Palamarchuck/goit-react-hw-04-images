import { Component } from "react";
import Api from './api'
import Modal from "./Modal";
import Searchbar from "./Searchbar";
import Loader from "./Loader";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import styles from './App.module.css'
import { ToastContainer } from 'react-toastify';

export default class App extends Component {
  state = {
    imagesParameters: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    largeImage: null,
    tags: null,
    showModal: false,
    showBtn: false,
    loaderActive: false,
  }
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const prevImage = prevState.imagesParameters;
    const nextImage = this.state.imagesParameters;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage || prevPage !== nextPage) {
      try {
        this.setState({ loaderActive: true, });
        const imagesData = await Api.fetchImage(nextImage, nextPage);

        this.setState(prevState => ({
          images: nextPage === 1 ? imagesData.hits : [...prevState.images, ...imagesData.hits],
          status: 'resolved',
          showBtn: true,
        }))
            
            if (imagesData.total === 0) {
              this.setState({
                status: 'rejected',
                images: [],
                showBtn: false
              });
            }
        
            if (imagesData.total > 0 && imagesData.hits.length < 12) {
              this.setState({                
                showBtn: false,
              });
             }                  
      } catch (error) {
        this.setState({ error, status: 'rejected' })
      } finally {
        this.setState({ loaderActive: false });
      }
    }
  }

  

  handleFormSubmit = imagesParameters => {
    // console.log(imagesParameters)
    this.setState({
      imagesParameters,
      page: 1,
      images: [],
    });
  }

  toggleModal = (largePicture, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largePicture: largePicture, tags:tags });
  };

  render() {
    const { images, largePicture, tags, status, showModal, showBtn, loaderActive } = this.state;
    return (
      <div className={styles.app}>
        {/* <div id="modal-root"></div> */}
        <Searchbar onSubmit={this.handleFormSubmit} />
       
        {loaderActive && (
          <Loader />
        )}

        {status === 'rejected' && (<h3 className={styles.h2}>{'Not found'}</h3>)}

        {status === 'resolved' && (
          <ImageGallery images={images} openModal={this.toggleModal} />         
        )}
        {showBtn && <Button onClick={this.loadMore} />}

        {showModal && (<Modal
          onclose={this.toggleModal}
          largePicture={largePicture}
          tags={tags} />
        )}
        
        <ToastContainer position="top-center"/>
      </div>
    );
  }
};
