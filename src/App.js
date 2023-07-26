import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Login, Register, HomePage, DashboardPage, UpdateEmail, UpdatePassword } from "./pages";
import { checkIsLoggedIn } from "./redux/actionCreators/authActionCreator";

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkIsLoggedIn());
  }, [])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/*" element={<DashboardPage />} />
        <Route path="/update-email" element={<UpdateEmail />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </>
  );
};

export default App;
