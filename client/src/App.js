import { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRouter from "./customRouter/PrivateRouter";
import PageRender from "./customRouter/PageRender";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";

function App() {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());

    // const socket = io()
    // dispatch({type: GLOBALTYPES.SOCKET, payload: socket})
    // return () => socket.close()
  }, [dispatch]);

  // useEffect(() => {
  //   if(auth.token) {
  //     dispatch(getPosts(auth.token))
  //     dispatch(getSuggestions(auth.token))
  //     dispatch(getNotifies(auth.token))
  //   }
  // }, [dispatch, auth.token])

  // useEffect(() => {
  //   if (!("Notification" in window)) {
  //     alert("This browser does not support desktop notification");
  //   }
  //   else if (Notification.permission === "granted") {}
  //   else if (Notification.permission !== "denied") {
  //     Notification.requestPermission().then(function (permission) {
  //       if (permission === "granted") {}
  //     });
  //   }
  // },[])

  // useEffect(() => {
  //   const newPeer = new Peer(undefined, {
  //     path: '/', secure: true
  //   })

  //   dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  // },[dispatch])

  return (
    <Router>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className="App">
        <div className="main">
          
          {auth.token && <Header />}

          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </div>
      </div>
    </Router>
  );
}

export default App;
