class MoviesApi {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  handleResponse(res, msg) {
    return res.ok ? res.json() : Promise.reject(`${res.status}: ${msg}`);
  }

  getMovies() {
    return fetch(`${this.url}`, {
      method: 'GET',
      headers: this.headers,
    }).then((res) => {
      return this.handleResponse(
        res,
        'Не удалось получить список фильмов по запросу'
      );
    });
  }
}

const options = {
  url: 'https://api.nomoreparties.co/beatfilm-movies',
  headers: {
    'Content-Type': 'application/json',
  },
};

const moviesApi = new MoviesApi(options);

export default moviesApi;
