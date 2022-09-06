import React, { useState } from 'react';
import { dbService } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const StarsRange = ({ isLoggedIn, userObj }) => {
  const [starRange, setStarRange] = useState(0);
  const [isEstiamte, setIsEstimate] = useState('NO'); //평가가 되었는지 아닌지 검사

  const onChange = (event) => {
    //레인지를 마우스로 잡고 조정중일때(아직 떼기 전이므로 클릭 전)
    const v = event.target.value;
    setStarRange(v);
  };

  const onClick = async () => {
    //클릭(눌렀다가 떼는 순간)이 이루어지면 BD로 넘어감
    // if (userObj === null) {
    //   return <div>로그인이 필요한 시스템입니다.</div>;
    // } else
    if (userObj !== null && starRange > 0) {
      setIsEstimate((isEstiamte) => !isEstiamte);
      await addDoc(collection(dbService, 'starRangeInDB'), {
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
        ratedStar: starRange,
      });
    }
  };

  return (
    <>
      <input type='range' min='0' max='5' step='0.5' defaultValue='0' onChange={onChange} onClick={onClick} />
      <div>{starRange > 0 ? (userObj === null ? '로그인이 필요한 시스템입니다.' : starRange + '점') : '아직 평가되지 않았습니다.'}</div>
    </>
  );
};

export default StarsRange;

/*
<input type='range' min='0' max='5' step='0.5' defaultValue='0' onChange={onChange} onClick={onClick} />
여기서 그냥 value 쓰니까 range가 기본값에서 고정되어서 움직이지 않음.
defaultValue를 써줘야 기본값으로 초기만 세팅되고 이후에 움직일 수 있음.
*/
