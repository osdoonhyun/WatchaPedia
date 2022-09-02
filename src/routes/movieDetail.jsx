import { useLocation } from 'react-router-dom';

const MovieDetail = () => {
  //문자열로 변환한 데이터를 다시 객체로 변환
  const movieInfo = JSON.parse(useLocation().state);
  
  console.log('영화인포',movieInfo);
  return (
    <>
      <div>
        <img src={movieInfo.stilUrls[0]} alt='스틸 이미지' />
      </div>
      <div>
        <img src={movieInfo.posterUrls[0]} alt='포스터 이미지' />
        <span>{movieInfo.title}</span>
        <br />
        <span>
          {movieInfo.prodYear} · {movieInfo.genre} · {movieInfo.nation}
        </span>
        <br />
        <span>별점</span>
      </div>
      <div>
        <div>기본정보</div>
        <div>
          {movieInfo.prodYear} · {movieInfo.nation} · {movieInfo.genre}
          <br />
          {Math.floor(movieInfo.runtime / 60)}시간{movieInfo.runtime % 60}분 · {movieInfo.rating}
        </div>
        <p>{movieInfo.plot}</p>
      </div>
      <div>{JSON.stringify(movieInfo.actorAndProd)}</div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </>
  );
};

export default MovieDetail;
