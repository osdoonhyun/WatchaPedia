import React, { useState } from "react";
// import './Header.css';
// import SearchIcon from "@material-ui/icons/Search"
// import AccountIcon from "@material-ui/icons/AccountCircle"
import {useNavigate,Link } from "react-router-dom";

function Header() {
  const Navigate = useNavigate();
  const [loggedIn, setLoggedIn]=useState(false);
  const onLoginClick=()=>{
    Navigate("./Login");    
    setLoggedIn((loggedIn)=>!loggedIn);
  }

  return (
    <>
      <div className="header">

        <div className="header_left">
          <img 
            className='header_logo' 
            src='img/watchapedia_logo.png'
            alt='watchapedia_logo'
          />
          <div className="header_nav">
            <span className="header_menu">영화</span>
            <span className="header_menu">TV</span>
            <span className="header_menu">책</span>
            <span className="header_menu">웹툰</span>
          </div>
        </div>

        <div className="header_right">
          <div className="header_option">
            <div className="header_search">
              <input 
                type='text' 
                placeholder='콘텐츠,인물,컬렉션, 유저를 검색해보세요.'            
                className='header_searchInput'
              />
              {/* <SearchIcon className="header_searchIcon"/> */}
            </div>
          </div> 
          {/* TODO: navigate 사용해서 페이지 이동 */}
          <Link to="./Login">Login</Link>
          <button onClick={onLoginClick}>{loggedIn ? "Login" :"평가하기"}</button>
          {/* <button onClick={()=>Navigate('/SignUp')}>{loggedIn ? "SignUp" : <AccountIcon className="header_accountIcon"/>}</button> */}
        </div>
      </div>
    </>
  );
}

export default Header;