import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import SimpleBackdrop from "./components/Loader";
import { useAppDispatch, useAppSelector } from "./store";
import { authorize } from "./actions/user";
import { getUser } from "./reducers/user";


function App() {
  // const user = { auth: true, user: "sid" };

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        dispatch(authorize());
        console.log(user);

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user.auth ?
              <Home /> : <Login user1={user} />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<Login user1={user} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;