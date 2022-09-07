// import './Header.css';
// import SearchIcon from "@material-ui/icons/Search"
// import AccountIcon from "@material-ui/icons/AccountCircle"
import Home from "../routes/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { authService } from "../firebase";

import SearchResult from "../routes/searchResult";
import Login from "../routes/login";
import SignUp from "../routes/signUp";
import MovieDetail from "../routes/movieDetail";
import Header from "./Header";
import Profile from "../routes/profile";
import ProfileEdit from "../routes/profileEdit";
import ProfileComment from "../routes/profileComment";
import ProfileEvaluation from "../routes/profileEvaluation";
import ProfileCollection from "../routes/profileCollection";
import NotFound from "../routes/NotFound";

function AppRouter() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserobj] = useState(null);

  useEffect(() => {
    // useEffect가 없으면 3번 렌더링 됨.
    //로그인 상태에 변화가 생겼다면
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn((loggedIn) => !loggedIn);
        //여기서 user에 유저 정보가 담기고 user.uid로 유저를 특정할 수가 있음
        setUserobj(user);
      } else {
        // 로그아웃 상태로 전환
        setIsLoggedIn((loggedIn) => !loggedIn);
        setUserobj(user);
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <Home isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route path="/Login" element={<Login isLoggedIn={isLoggedIn} />} />
          <Route path="/SignUp" element={<SignUp isLoggedIn={isLoggedIn} />} />
          <Route
            path="/SearchResult"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <SearchResult isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path="/MovieDetail/:movieSeq"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <MovieDetail isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path="/Profile"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <Profile isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path="/ProfileEdit"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <ProfileEdit isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path="/ProfileEvaluation"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <ProfileEvaluation isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path="/ProfileComment"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <ProfileComment isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path="/ProfileCollection"
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <ProfileCollection isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;

//Router 태그 안에 있는 컴포넌트만이 useNavigate 훅, Link태그를 사용하여 라우팅이 가능함에 주의한다!
// * '에스터리스크 ' 를 이용하여 작성하지 않은 Route 예외되는 페이지는 NotFound로 이동
// useEffect onAuthStateChanged 로그인/로그아웃 상태 잊지말고 구현
