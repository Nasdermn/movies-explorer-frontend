import './App.css';
// import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
// import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute.js';

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';

import Profile from '../Profile/Profile.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import NotFound from '../NotFound/NotFound.js';

function App() {
  // const [loggedIn, setLoggedIn] = useState(false);
  // const navigate = useNavigate();

  return (
    <div className='page'>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/saved-movies' element={<SavedMovies />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
