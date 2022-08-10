import React, { Component } from "react"
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import styles from './Searchbar.module.css'
import PropTypes from 'prop-types';

export default class Searchbar extends Component {
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    };

    state = {
        imagesParameters:'',
    }
    
    handleNameChange = event => {
        this.setState({ imagesParameters: event.currentTarget.value.toLowerCase() });
        
    }

    handleSubmit = event => {
        event.preventDefault();
        if (this.state.imagesParameters.trim() === '') {
            return toast.error("Ввести имя!")
            
        }
        this.props.onSubmit(this.state.imagesParameters)
        this.setState({ imagesParameters: ''})
    }


    render() {
        return (
            <header className={styles.searchbar}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.button}>
                        <ImSearch size={20} />
                    </button>

                    <input
                        className={styles.input}
                        type="text"
                        name="imageName"
                        value={this.state.imagesParameters}
                        onChange={this.handleNameChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        );
    }
};