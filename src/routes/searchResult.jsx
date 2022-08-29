import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

//코드 설명
//1. searchedMovies = useLocation().state는 {state} = useLocation() 과 같으나
//따로 이름을 설정하기 위해 사용
//2. data-이름 속성으로 태그에 데이터를 저장할 수 있음
//3. event.target.dataset.이름 으로 데이터를 가져올 수 있음
//4. 객체는 출력하려면 JSON.stringify()로 문자열 변환이 필요
//5. 문자열로 변환한 객체를 다시 객체로 사용하기 위해서는
//JSON.parse()를 이용하여 객체로 변환이 가능하다.
const SearchResult = () => {
  const searchedMovies = useLocation().state;
  const Navigate = useNavigate();

  const onClick = (event) => {
    const movieInfo = event.target.dataset.clicked_movie_info;
    Navigate('/MovieDetail', { state: movieInfo });
  };

  return (
    <>
      <span>검색 결과 페이지</span>
      <div>
        <form>
          {searchedMovies.map((m) => (
            <div onClick={onClick} key={m.movieSeq}>
              <div>
                <img src={m.posterUrls[0]} alt='포스터 사진' width='160' height='233' data-clicked_movie_info={JSON.stringify(m)} />
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
