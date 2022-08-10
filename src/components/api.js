
const BASE_URL = 'https://pixabay.com/api/?key=';
const API_KEY = '28144653-5088632044d19e3dab312bf72';
const PARAMS = '}&image_type=photo&orientation=horizontal&per_page=12';

export default function fetchImage(imagesParameters, page) {
  return fetch(
        BASE_URL + API_KEY + `&q=${imagesParameters}` + PARAMS + `&page=${page}`
        ).then(response => {
            if (response.ok) {
                return response.json();
                }
        return Promise.reject(new Error(`Nothing`));
            });
}

