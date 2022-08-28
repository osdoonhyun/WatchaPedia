import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {
  const { state } = useLocation();
  console.log(state);

  const onClick = () => {
    console.log('해당 영화가 클릭되었습니다.');
  };

  return (
    <>
      <span>검색 결과 페이지</span>
      <div>
        <form>
          {state.map((m) => (
            // <button key={m.movieSeq}>{m.title}</button>
            <div onClick={onClick} key={m.movieSeq}>
              <div>
                <img src={m.posterUrl} alt='포스터 사진' width='160' height='233' />
              </div>
              <div>{m.title}</div>
              <div>
                {m.prodYear}·{m.nation}
              </div>
              <div>{m.genre}</div>
            </div>
          ))}
        </form>
      </div>
    </>
  );
};

export default SearchResult;
