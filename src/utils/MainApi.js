import { API_URL } from './constants';

class MainApi {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then((errorData) => {
        const error = new Error(
          errorData.message || 'Ошибка при отработке компонента MainApi'
        );
        error.status = res.status;
        return Promise.reject(error);
      });
    }
  }

  signup(name, email, password) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ name, email, password }),
    }).then(this.handleResponse);
  }

  signin(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ email, password }),
    }).then(this.handleResponse);
  }

  getUser(jwt) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.handleResponse);
  }

  patchProfile(name, email) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this.handleResponse);
  }

  saveMovie(movieData) {
    console.log(movieData);
    const {
      nameRU,
      nameEN,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      id,
    } = movieData;
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nameRU,
        nameEN,
        country,
        director,
        duration,
        year,
        description,
        image: API_URL + image.url,
        trailerLink,
        thumbnail: API_URL + image.formats.thumbnail.url,
        movieId: id,
      }),
    }).then(this.handleResponse);
  }

  getSavedMovies() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this.handleResponse);
  }

  deleteSavedMovie(id) {
    const token = localStorage.getItem('jwt');
    return fetch(`${this.url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }).then(this.handleResponse);
  }
}

const options = {
  url: 'https://api.films.nasdermn.nomoreparties.sbs/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const mainApi = new MainApi(options);

export default mainApi;
