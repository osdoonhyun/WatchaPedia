import React from "react";
// 이미지 가져올시 import 를 통해서 가져와야 한다.
import watchapedia_logo from "../images/watchapedia_logo.png";
// import './Header.css';
// import SearchIcon from "@material-ui/icons/Search"
// import AccountIcon from "@material-ui/icons/AccountCircle"
import { useNavigate } from "react-router-dom";
import SearchBar from "./searchBar";

function Header({ isLoggedIn, userObj }) {
  const navigate = useNavigate();

  const onLoginClick = () => {
    navigate("./Login");
  };
  const onSignUpClick = () => {
    navigate("./SignUp");
  };
  const onProfileClick = () => {
    navigate("./Profile");
  };
  const onEstimateClick = () => {
    navigate("./");
  };

  return (
    <>
      <div className="header">
        <div className="header_left">
          {}
          <img
            className="header_logo"
            src={watchapedia_logo}
            alt="watchapedia_logo"
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
              <SearchBar
                className="header_searchInput"
                isLoggedIn={isLoggedIn}
                userObj={userObj}
              />
            </div>
          </div>
          {isLoggedIn ? (
            <button onClick={onEstimateClick}>평가하기</button>
          ) : (
            <button onClick={onLoginClick}>로그인</button>
          )}
          {isLoggedIn ? (
            <button onClick={onProfileClick}>프로필 사진</button>
          ) : (
            <button onClick={onSignUpClick}>회원가입</button>
          )}
        </div>
      </div>
    </>
  );
}
export default Header;
// 새로고침하면서 public에 있던왓챠피디아 로고를 늦게 가져오면서 alt값이 출력되는데 import를 통해 바로 가져오면서 해결
