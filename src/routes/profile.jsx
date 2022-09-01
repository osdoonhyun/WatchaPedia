import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import { getAuth } from "firebase/auth";

function Profile() {
  const Navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user); 
  console.log(user.displayName); //이름
  console.log(user.photoURL); //photo

  
  const onProfileEditClick = () => {
    Navigate('/ProfileEdit');
  };
  const onEvaluationClick = () => {
    Navigate('/ProfileEvaluation');
  };
  const onCommentClick = () => {
    Navigate('/ProfileComment');
  };
  const onCollectionClick = () => {
    Navigate('/ProfileCollection');
  };

  return(
    <div className='profilePage'>
      <Header/>
      <div className='profile'>
        <div className='profile_img'>
          <img 
            src={user.photoURL} 
            alt='프로필 이미지'
          />
        </div>
        <div className='profile_name'>
          {user.displayName}
        </div>
        <button onClick={onProfileEditClick} className='profile_edit'>프로필 수정</button>
        <div onClick={onEvaluationClick} 
          className='profile_evaluation'
        >
          평가 
        </div>
        <div 
          onClick={onCommentClick}
          className='profile_comment'
        >
          코멘트
        </div>
        <div 
          onClick={onCollectionClick}
          className='profile_collection'
        >
          컬렉션
        </div>
      </div>
      <div className='profile_preference_analysis'
        >
        취향분석
      </div>
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
  )
}

export default Profile;