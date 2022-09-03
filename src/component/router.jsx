// import './Header.css';
// import SearchIcon from "@material-ui/icons/Search"
// import AccountIcon from "@material-ui/icons/AccountCircle"
import Home from '../routes/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { authService } from '../firebase';

import SearchResult from '../routes/searchResult';
import Login from '../routes/login';
import SignUp from '../routes/signUp';
import MovieDetail from '../routes/movieDetail';
import Header from './Header';

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
      }
    });
  }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <Home isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route path='/Login' element={<Login isLoggedIn={isLoggedIn} />} />
          <Route path='/SignUp' element={<SignUp isLoggedIn={isLoggedIn} />} />
          <Route
            path='/SearchResult'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <SearchResult isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
          <Route
            path='/MovieDetail/:movieSeq'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} userObj={userObj} />
                <MovieDetail isLoggedIn={isLoggedIn} userObj={userObj} />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default AppRouter;

//Router 태그 안에 있는 컴포넌트만이 useNavigate 훅, Link태그를 사용하여 라우팅이 가능함에 주의한다!
