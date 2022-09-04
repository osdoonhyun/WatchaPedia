import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResult = () => {
  const searchedMovies = useLocation().state;
  const navigate = useNavigate();

  const onClick = (event) => {
    //넘긴 데이터를 받아옴
    const movieInfo = event.target.dataset.clicked_movie_info;
    const movieInfoObj = JSON.parse(movieInfo); //string을객체로 바꿔서 movieSeq Id 값으로 넘겨줌
    navigate(`/MovieDetail/${movieInfoObj.movieSeq}`, { state: movieInfo });
  };

  return (
    <>
      <span>검색 결과 페이지</span>
      <div>
        <form>
          {searchedMovies.map((m) => (
            <div onClick={onClick} key={m.movieSeq}>
              <div>
                {/* 클릭하는 태그에서 객체 데이터를 문자열로 변환한 데이터를 넘김 */}
                <img src={m.posterUrl} alt='포스터 사진' width='160' height='233' data-clicked_movie_info={JSON.stringify(m)} />
              </div>
              <div data-clicked_movie_info={JSON.stringify(m)}>{m.title}</div>
              <div data-clicked_movie_info={JSON.stringify(m)}>
                {m.prodYear} · {m.nation}
              </div>
              <div data-clicked_movie_info={JSON.stringify(m)}>{m.genre}</div>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

export default SearchResult;
