import React from "react";
import { ReactElement } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { PrivateRoute } from "./private.route";
import SignIn from "../auth/pages/sign-in";
import Fleet from "../fleet/pages/fleet";
import { useSelector } from "react-redux";
import { RootState } from "../auth/redux/store";

export const AppRouter = (): ReactElement => {
  const isLogged = useSelector((state: RootState) =>
    !!state.user.token || !!localStorage.getItem('token')
  );
  return (
    <Routes>

      <Route path="*" element={<Navigate to="/sign-in" replace />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route element={<PrivateRoute canActivate={isLogged} defaultDestination="/sign-in" />}>
        <Route path="/fleet" element={<Fleet />} />
      </Route>
    </Routes>
  );
};
