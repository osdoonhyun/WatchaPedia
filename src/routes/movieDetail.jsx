import { useLocation } from 'react-router-dom';
import StarsRange from '../component/starsRange';

const MovieDetail = ({ isLoggedIn, userObj }) => {
  //문자열로 변환한 데이터를 다시 객체로 변환
  const movieInfo = JSON.parse(useLocation().state);

  return (
    <>
      <div>
        <img src={movieInfo.stilUrls[0]} alt='스틸 이미지' />
      </div>
      <div>
        <img src={movieInfo.posterUrl} alt='포스터 이미지' />
        <span>{movieInfo.title}</span>
        <br />
        <span>
          {movieInfo.prodYear} · {movieInfo.genre} · {movieInfo.nation}
        </span>
        <br />
      </div>
      <div>
        <StarsRange isLoggedIn={isLoggedIn} userObj={userObj} movieSeq={movieInfo.movieSeq} />
      </div>
      <br />
      <div>
        <div>기본정보</div>
        <div>
          {movieInfo.prodYear} · {movieInfo.nation} · {movieInfo.genre}
          <br />
          {Math.floor(movieInfo.runtime / 60)}시간{movieInfo.runtime % 60}분 · {movieInfo.rating}
        </div>
        <p>{movieInfo.plot}</p>
      </div>
      {movieInfo.actorAndProd.map((staffs, index) => (
        <div key={index}>
          {staffs.staffRoleGroup === '감독' || staffs.staffRoleGroup === '출연' ? (
            <>
              <div>{staffs.staffNm}</div>
              <div>
                {staffs.staffRole ? `${staffs.staffRoleGroup} | ${staffs.staffRole} ` : `${staffs.staffRoleGroup} | ${staffs.staffEtc} `}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
};

export default MovieDetail;
//동명이인, 다중역할의 경우 키값이 겹치기 때문에 인덱스로 줬음
