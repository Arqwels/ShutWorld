import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";

import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar/Navbar';
import { Context } from '.';
import { observer } from 'mobx-react-lite';
import ScrollToTop from './ScrollToTop';

const App = () => {
  const { store } = useContext(Context);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsAuthChecked(true);
      store.checkAuth()
    } else {
      setIsAuthChecked(true);
    }
  }, [store]);

  if(store.isLoading || !isAuthChecked) {
    return <div>ЗАГРУЖАЮСЬ ЖДИИИИ!!!...</div>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
      <ScrollToTop /> {/* Временное решение! */}
    </BrowserRouter>
  );
};

export default observer(App)