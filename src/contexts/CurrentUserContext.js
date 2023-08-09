import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext();

export function useCurrentUserContext() {
  return useContext(CurrentUserContext);
}

export function CurrentUserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('jwt'));

  return (
    <CurrentUserContext.Provider
      value={{ userInfo, setUserInfo, loggedIn, setLoggedIn }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
}
