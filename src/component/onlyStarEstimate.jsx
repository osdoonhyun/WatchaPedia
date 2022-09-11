import React, { useState } from 'react';
import { dbService } from '../firebase';
import { setDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
//setDoc은 내가 지정한 이름으로 DB 문서 이름을 주기 위해서 사용한다.
//addDoc과의 차이점은 addDoc은 collection을, setDoc은 doc을 사용한다.

const OnlyStarEstimate = ({ isLoggedIn, userObj, movieInfo }) => {
  const [starRange, setStarRange] = useState(0); //별점
  const [isEstimate, setIsEstimate] = useState(false); //별점 평가가 되었는가?(별점 수정 시에 필요)
  const [movieDBobj, setMovieDBobj] = useState({});

  useEffect(() => {
    //오류를 없애기 위해 파이어베이스에 색인을 모두 만들어주어야 한다.
    //바뀔 가능성이 있는 것들 모두 의존성배열에 넣는다.->실행은 상관없는데 주의 메시지가 뜸
    if (userObj !== null) {
      setMovieDBobj({
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
        ratedStar: starRange,
        userName: userObj.displayName,
        profileImg: userObj.photoURL,
        commentText: '', //여기서는 코멘트 필요없음
        title: movieInfo.title,
        prodYear: movieInfo.prodYear,
        posterUrl: movieInfo.posterUrl,
        movieSeq: movieInfo.movieSeq,
      });
    }
    console.log('로딩중');
  }, [userObj, starRange, movieInfo.title, movieInfo.prodYear, movieInfo.posterUrl, movieInfo.movieSeq]);

  const onChangeStar = (event) => {
    //레인지를 마우스로 잡고 조정중일때(아직 떼기 전이므로 클릭 전)
    const v = event.target.value; //문자열
    setStarRange(Number(v)); //소수점 포함하는 숫자로 변환
  };

  const onClickStar = async () => {
    //클릭(눌렀다가 떼는 순간)이 이루어지면 BD로 넘어감
    if (isLoggedIn === true) {
      //로그인이 된 상태라면
      if (isEstimate === false && starRange > 0) {
        //평가가 0점보다 크고 아직 평가가 없다면 새로 별점 DB 생성
        setIsEstimate((isEstimate) => !isEstimate);
        await setDoc(doc(dbService, `starRangeInDB`, `MOVIE${movieInfo.movieSeq}USERUID${userObj.uid}`), movieDBobj);
      } else if (isEstimate === true && starRange > 0) {
        //평가가 0점 보다 크지만 이미 평가 내용이 있다면 => 평가 데이터 업데이트.
        await updateDoc(doc(dbService, `starRangeInDB`, `MOVIE${movieInfo.movieSeq}USERUID${userObj.uid}`), movieDBobj);
      } else if (isEstimate === true && starRange === 0) {
        //평가가 0점이지만 이미 평가 내용이 있다면 => 평가 데이터 삭제.
        setIsEstimate((isEstimate) => !isEstimate);
        await deleteDoc(doc(dbService, `starRangeInDB`, `MOVIE${movieInfo.movieSeq}USERUID${userObj.uid}`));
      }
    }
  };

  return (
    <>
      <input type='range' min='0' max='5' step='0.5' defaultValue='0' onChange={onChangeStar} onClick={onClickStar} />
      <div>
        {starRange > 0 ? (isLoggedIn === true ? starRange + '점' : '로그인이 필요한 시스템입니다.') : '아직 평가되지 않았습니다.'}
      </div>
    </>
  );
};

export default OnlyStarEstimate;

/*
<input type='range' min='0' max='5' step='0.5' defaultValue='0' onChange={onChange} onClick={onClick} />
여기서 그냥 value 쓰니까 range가 기본값에서 고정되어서 움직이지 않음.
defaultValue를 써줘야 기본값으로 초기만 세팅되고 이후에 움직일 수 있음.
*/
