import React from "react";
import Header from "../component/Header";

function ProfileEdit() {

  console.log('프로필 수정 페이지입니다.');
  return (
    <div className="profileEdit">
      <Header/>
      <p> 프로필 수정 페이지입니다.</p>
      <div>이름</div>
      <div>소개</div>
    </div>
  );
}

export default ProfileEdit;