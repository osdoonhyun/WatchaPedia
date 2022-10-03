import { useLocation } from 'react-router-dom';
import StarsRange from '../component/starsRange';
import styles from '../css/movieDetail.module.css'; //이름.module.css로 만들어야 함

const MovieDetail = ({ isLoggedIn, userObj }) => {
  //문자열로 변환한 데이터를 다시 객체로 변환
  const movieInfo = JSON.parse(useLocation().state);

  return (
    <div>
      <div className={styles.upperInfo}>
        <div className={styles.stilImg}>
          <img src={movieInfo.stilUrls[0]} alt='스틸 이미지' />
        </div>
        <div>
          <div className={styles.upperInfoPosterTextBox}>
            <img className={styles.posterImg} src={movieInfo.posterUrl} alt='포스터 이미지' />
            <div className={styles.upperInfoTextBox}>
              <div>
                <div className={styles.upperTitle}>{movieInfo.title}</div>
                <div className={styles.upperInner}>
                  {movieInfo.prodYear} · {movieInfo.genre} · {movieInfo.nation}
                </div>
              </div>
              <div>
                <StarsRange isLoggedIn={isLoggedIn} userObj={userObj} movieInfo={movieInfo} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.lowerBox}>
        <div className={styles.basicInfoBox}>
          <div className={styles.basicInfoText}>기본정보</div>
          <div className={styles.basicInfoInnerText}>
            <div>{movieInfo.titleEng}</div>
            <div>
              {movieInfo.prodYear} · {movieInfo.nation} · {movieInfo.genre}
              <br />
              {Math.floor(movieInfo.runtime / 60)}시간{movieInfo.runtime % 60}분 · {movieInfo.rating}
            </div>
            <p>{movieInfo.plot}</p>
          </div>
          <div className={styles.basicInfoStaffBox}>
            <div className={styles.basicInfoText}>출연/제작</div>
            {movieInfo.actorAndProd.map((staffs, index) => (
              <>
                <div key={index}>
                  {staffs.staffRoleGroup === '감독' || staffs.staffRoleGroup === '출연' ? (
                    <div className={styles.basicInfoStaffs}>
                      <div>{staffs.staffNm}</div>
                      <div>
                        {staffs.staffRole
                          ? `${staffs.staffRoleGroup} | ${staffs.staffRole} `
                          : `${staffs.staffRoleGroup} | ${staffs.staffEtc} `}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
//동명이인, 다중역할의 경우 키값이 겹치기 때문에 인덱스로 줬음
