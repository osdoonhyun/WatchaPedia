import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";

function Profile({ isLoggedIn, userObj }) {
  const Navigate = useNavigate();
  const [error, setError] = useState("");
  const onProfileEditClick = () => {
    Navigate("/ProfileEdit");
  };
  const onEvaluationClick = () => {
    Navigate("/ProfileEvaluation");
  };
  const onCommentClick = () => {
    Navigate("/ProfileComment");
  };
  const onCollectionClick = () => {
    Navigate("/ProfileCollection");
  };

  const onLogoutClick = async () => {
    try {
      await signOut(authService);
      // onAuthStateChanged(authService, (user) => {
      //   if (!user) {
      //     console.log("userObj", user);
      //     console.log("isLoggedIn", isLoggedIn);
      //   }
      // });
      Navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="profilePage">
      <div className="profile">
        <>
          {userObj ? (
            <div>
              <div className="profile_img">
                <img
                  src={userObj ? userObj.photoURL : "로딩중"}
                  alt="프로필 이미지"
                />
              </div>
              <div className="profile_name">{userObj.displayName}</div>
            </div>
          ) : (
            <></>
          )}
        </>

        <button onClick={onProfileEditClick} className="profile_edit">
          프로필 수정
        </button>
        <button onClick={onLogoutClick}>로그아웃</button>
        <span>{error}</span>
        <div onClick={onEvaluationClick} className="profile_evaluation">
          평가
        </div>
        <div onClick={onCommentClick} className="profile_comment">
          코멘트
        </div>
        <div onClick={onCollectionClick} className="profile_collection">
          컬렉션
        </div>
      </div>
      <div className="profile_preference_analysis">취향분석</div>
      {/* <div className='profile_storage'>
        <p>보관함</p>
        <div 
          onClick={onMovieClick} 
          className='profile_storage_Movie'
        >
          <div>영화 아이콘</div>
          <div>영화</div>
        </div>
        <div className='profile_storage_TV'>
          <div> TV 아이콘</div>
          <div>TV</div>
        </div>
        <div className='profile_storage_Book'>
          <div>책 아이콘</div>
          <div>책</div>
        </div>
        <div className='profile_storage_Webtoon'>
          <div>웹툰 아이콘</div>
          <div>웹툰</div>
        </div> }
      </div> */}
    </div>
  );
}

export default Profile;

// signOut 메서드 사용하여 로그아웃 후 Navigate로 홈으로 이동
// userObj props로 늦게 넘어오면서 null값을 받아와 에러가 나는데, 삼항연산자 사용하여 해결
