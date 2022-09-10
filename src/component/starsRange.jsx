import React, { useState } from 'react';
import { dbService } from '../firebase';
import { setDoc, serverTimestamp, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
//setDoc은 내가 지정한 이름으로 DB 문서 이름을 주기 위해서 사용한다.
//addDoc과의 차이점은 addDoc은 collection을, setDoc은 doc을 사용한다.

const StarsRange = ({ isLoggedIn, userObj, movieInfo }) => {
  const [starRange, setStarRange] = useState(0); //별점
  const [commentText, setCommentText] = useState(''); //코멘트 작성 내용
  const [isEstimate, setIsEstimate] = useState(false); //별점 평가가 되었는가?(별점 수정 시에 필요)
  const [commentToggle, setCommentToggle] = useState(false); //코멘트를 작성할 것인가?
  const [isSaved, setIsSaved] = useState(false); //코멘트 작성 후 저장하기 버튼을 눌렀는가?
  const [movieDBobj, setMovieDBobj] = useState({});

  useEffect(() => {
    //오류를 없애기 위해 파이어베이스에 색인을 모두 만들어주어야 한다.
    if (userObj !== null) {
      setMovieDBobj({
        createdAt: serverTimestamp(),
        creatorId: userObj.uid,
        ratedStar: starRange,
        commentText, //단축 속성명 사용
        title: movieInfo.title,
        prodYear: movieInfo.prodYear,
        posterUrl: movieInfo.posterUrl,
        movieSeq: movieInfo.movieSeq,
      });
    }
    console.log('로딩중');
  }, [commentText]);

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

  const onChangeComment = (event) => {
    const text = event.target.value;
    setCommentText(text);
  };

  const onClickUpdateComment = async () => {
    await updateDoc(doc(dbService, `starRangeInDB`, `MOVIE${movieInfo.movieSeq}USERUID${userObj.uid}`), movieDBobj);
    setIsSaved(true);
  };

  const onClickDeleteComment = async () => {
    setCommentText('');
    await updateDoc(doc(dbService, `starRangeInDB`, `MOVIE${movieInfo.movieSeq}USERUID${userObj.uid}`), {
      createdAt: serverTimestamp(),
      creatorId: userObj.uid,
      commentText: '', //초기화 해야하기 때문에 빈값을 넣어준다. set함수와 동시에 적용이 안되는 것으로 보임
      ratedStar: starRange,
      title: movieInfo.title,
      prodYear: movieInfo.prodYear,
      posterUrl: movieInfo.posterUrl,
      movieSeq: movieInfo.movieSeq,
    });
    setCommentToggle(false);
    setIsSaved(false);
  };

  const onClickCommentToggle = () => {
    setCommentToggle(true);
  };

  return (
    <>
      <input type='range' min='0' max='5' step='0.5' defaultValue='0' onChange={onChangeStar} onClick={onClickStar} />
      <div>
        {starRange > 0 ? (isLoggedIn === true ? starRange + '점' : '로그인이 필요한 시스템입니다.') : '아직 평가되지 않았습니다.'}
      </div>
      <br />
      {isEstimate === true ? ( //별점 평가되었다면
        commentToggle === false ? ( //별점 평가는 되었지만 코멘트를 작성하지 않았다면
          <div>
            <span>이 작품에 대한 {userObj.displayName}님의 생각을 남겨주세요!</span>
            <button onClick={onClickCommentToggle}>코멘트 남기기</button>
          </div>
        ) : (
          //별점 평가를 남긴 후, 코멘트 남기기 버튼을 눌렀다면
          <div>
            <div>{movieInfo.title}</div>
            <textarea
              type='text'
              maxLength={10000}
              placeholder='이 작품에 대한 생각을 자유롭게 표현해주세요.'
              value={commentText}
              onChange={onChangeComment}
            />
            {isSaved === false ? ( //코멘트를 적은 후 저장하기 누르기 전
              <button onClick={onClickUpdateComment}>저장하기</button>
            ) : (
              //코멘트를 적고 저장하기 누른 후
              <>
                <button onClick={onClickUpdateComment}>수정하기</button>
                <button onClick={onClickDeleteComment}>삭제하기</button>
              </>
            )}
          </div>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default StarsRange;

/*
<input type='range' min='0' max='5' step='0.5' defaultValue='0' onChange={onChange} onClick={onClick} />
여기서 그냥 value 쓰니까 range가 기본값에서 고정되어서 움직이지 않음.
defaultValue를 써줘야 기본값으로 초기만 세팅되고 이후에 움직일 수 있음.
*/
