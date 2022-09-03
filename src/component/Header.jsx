import React from 'react';
// import './Header.css';
// import SearchIcon from "@material-ui/icons/Search"
// import AccountIcon from "@material-ui/icons/AccountCircle"
import { useNavigate } from 'react-router-dom';
import SearchBar from './searchBar';

function Header({ isLoggedIn, userObj }) {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate('./Login');
  };
  const onSignUpClick = () => {
    navigate('./SignUp');
  };
  const onProfileClick = () => {
    navigate('./');
  };
  const onEstimateClick = () => {
    navigate('./');
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
              <SearchBar className='header_searchInput' isLoggedIn={isLoggedIn} userObj={userObj} />
            </div>
          </div>
          {isLoggedIn ? <button onClick={onEstimateClick}>평가하기</button> : <button onClick={onLoginClick}>로그인</button>}
          {isLoggedIn ? <button onClick={onProfileClick}>프로필 사진</button> : <button onClick={onSignUpClick}>회원가입</button>}
        </div>
      </div>
    </>
  );
}
export default Header;
