import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Context } from "..";
import { authRoutes, publicRoutes } from "../routes";
import { observer } from "mobx-react-lite";

import ModalSandbox from "./Shop/Sandbox";

const AppRouter = () => {
  const { store } = useContext(Context);

  return (
    <Routes>
      {store.isAuth && authRoutes.map(({path, Component}) =>
        <Route key={path} path={path} element={<Component/>} exact/>
      )}

      {publicRoutes.map(({path, Component}) => 
        <Route key={path} path={path} element={<Component/>} exact/>
      )}

      <Route path="/*" element={<Navigate to="/" />} />
      <Route path="/modal" element={<ModalSandbox />} />
    </Routes>
  );
};

export default observer( AppRouter );
