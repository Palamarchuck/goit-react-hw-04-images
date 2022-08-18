import React, { useState  } from "react"
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css'


const Searchbar = ({onSubmit}) => {
    const [imagesParameters, setImagesParameters] = useState('');
   
    
   const handleNameChange = event => {
        setImagesParameters(event.currentTarget.value.toLowerCase());
        
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (imagesParameters.trim() === '') {
            return toast.error("Ввести имя!") 
        }
        onSubmit(imagesParameters);
        setImagesParameters('');
    }


    return (
            <header className={styles.searchbar}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <button type="submit" className={styles.button}>
                        <ImSearch size={20} />
                    </button>

                    <input
                        className={styles.input}
                        type="text"
                        name="imageName"
                        value={imagesParameters}
                        onChange={handleNameChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    
};

export default Searchbar;