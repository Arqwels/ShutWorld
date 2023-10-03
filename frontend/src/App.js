import React, { useContext, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";

import AppRouter from './components/AppRouter'
import Navbar from './components/Navbar/Navbar';
import { Context } from '.';
import { observer } from 'mobx-react-lite';

const App = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    if(localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [store]);

  if(store.isLoading) {
    return <div>ЗАГРУЖАЮСЬ ЖДИИИИ!!!...</div>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
};

export default observer(App)