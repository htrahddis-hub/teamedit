import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./store";
import { authorize } from "./actions/user";
import { getUser } from "./reducers/user";
import { JSX } from "react/jsx-runtime";

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const EditorHome = lazy(() => import('./pages/editorHome'));
const SignUp = lazy(() => import('./pages/signup'));


function App() {
  // const user = { auth: true, user: "sid" };

  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);

  React.useEffect(() => {

    const fetchData = async () => {
      try {
        dispatch(authorize());

      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [dispatch]);


  const suspenseWrapper = (WrappedComponent:React.FunctionComponent) => (props: JSX.IntrinsicAttributes) => {
    return (
      <Suspense fallback={<div />}>
        <WrappedComponent  {...props}/>
      </Suspense>
    );
  };


  const LoginWithSuspense = suspenseWrapper(Login);
  const SignupWithSuspense = suspenseWrapper(SignUp);
  const HomeWithSuspense = suspenseWrapper(Home);
  const EditorHomeWithSuspense = suspenseWrapper(EditorHome);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={user.auth ?
              <HomeWithSuspense /> : <LoginWithSuspense />}
          />
          <Route
            path="/signup"
            element={<SignupWithSuspense />}
          />
          <Route
            path="/login"
            element={<LoginWithSuspense />}
          />
          <Route
            path="/editor/:id"
            element={user.auth ? <EditorHomeWithSuspense /> : <LoginWithSuspense />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
