import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import EditorHome from "./pages/editorHome";
import { useAppDispatch, useAppSelector } from "./store";
import { authorize } from "./actions/user";
import { getUser } from "./reducers/user";
import { fetch } from "./actions/fileList";


function App() {
  // const user = { auth: true, user: "sid" };

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        dispatch(authorize());
        dispatch(fetch());

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
              <Home /> : <Login />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/editor/:id"
            element={user.auth ? <EditorHome /> : <Login />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
