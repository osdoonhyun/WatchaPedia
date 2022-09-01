import React, { useEffect, useState } from 'react';
// import './Header.css';
// import SearchIcon from "@material-ui/icons/Search"
// import AccountIcon from "@material-ui/icons/AccountCircle"
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchBar';
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../firebase';
import StarsRange from './starsRange';

function Header() {
  const Navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userObj, setUserobj] = useState(null);

  useEffect(() => {
    // useEffect가 없으면 3번 렌더링 됨.
    //로그인 상태에 변화가 생겼다면
    onAuthStateChanged(authService, (user) => {
      if (user) {
        //여기서 user에 유저 정보가 담기고 user.uid로 유저를 특정할 수가 있음
        setLoggedIn(true);
        setUserobj(user);
      }
    });
  }, []);

  const onLoginClick = () => {
    Navigate('./Login');
  };

  return (
    <>
      <div className='header'>
        <div className='header_left'>
          <img className='header_logo' src='img/watchapedia_logo.png' alt='watchapedia_logo' />
          <div className='header_nav'>
            <span className='header_menu'>영화</span>
            <span className='header_menu'>TV</span>
            <span className='header_menu'>책</span>
            <span className='header_menu'>웹툰</span>
          </div>
        </div>

        <div className='header_right'>
          <div className='header_option'>
            <div className='header_search'>
              <SearchBar className='header_searchInput' />
              <StarsRange />
              {/* <SearchIcon className="header_searchIcon"/> */}
            </div>
          </div>
          {/* TODO: navigate 사용해서 페이지 이동 */}
          <button onClick={onLoginClick}>{loggedIn ? '평가하기' : 'Login'}</button>
          <button onClick={() => Navigate('/signUp')}>{loggedIn ? '프로필' : 'SignUp'}</button>
          {/* <button onClick={()=>Navigate('/SignUp')}>{loggedIn ? "SignUp" : <AccountIcon className="header_accountIcon"/>}</button> */}
        </div>
      </div>
    </>
  );
}

export default Header;

/*
        왜 const Navigate = useNavigate(); 해서 화면 변환 안하는지 알겠음
        이렇게 하면 일일이 state로 다 던져야 되는데
        유저정보처럼 로그인한 페이지에서는 모든 페이지에 다 필요하지만,
        로그인하지 않은 상태에서는 모두 필요하지 않은 정보가 있음.
        로그인했는지 안했는지에 따라 필요하고 필요하지 않고 정해지는 거임.
        그렇다면 if 로그인 했냐 -> 유저정보 필요, else -> 유저정보 필요없음이 되는데
        useLocation()과 같은 리액트훅은 if문 내에서 쓸 수가 없음.
        어떤 상태에서나 같은 동작을 해야하는 리액트 훅의 규칙때문.
        따라서 우리는 router.jsx 파일에서 필요한 모든 프롭스를 다 넣고
        라우터마다 필요한 프롭스만 받아서 라우팅하는 것으로
        아래와 같이 전면 수정이 필요함!
        
        // router.jsx 예시
        const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
          return (
            <Router>
              {isLoggedIn && <Navigation userObj={userObj} />}
              <Switch>
                {isLoggedIn ? (
                  <>
                    <Route exact path='/'>
                      <Home userObj={userObj} />
                    </Route>
                    <Route exact path='/profile'>
                      <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                  </>
                ) : (
                  <Route exact path='/'>
                    <Auth />
                  </Route>
                )}
              </Switch>
            </Router>
          );
        };
        */
