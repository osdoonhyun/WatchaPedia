import React, { useState, useEffect } from 'react';
import SearchMovie from './searchMovie';

function MovieRank() {
  const [movies, setMovies] = useState([]);

  //영진위 영화정보 가져오기
  const getMovies = async () => {
    const json = await (
      await fetch(
        `http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=9674dd7ff57f3049d68c7349e58025ba&targetDt=20220827&itemPerPage=10`
      )
    ).json();
    setMovies(json['boxOfficeResult']['dailyBoxOfficeList']);
  };
  useEffect(() => {
    getMovies();
  }, []);

  //toFixed() : 괄호 안에 숫자가 소수점 자릿수를 나타냄
  const moviesList = movies.map((movie) => {
    return {
      rnum: movie.rnum,
      rank: movie.rank,
      openDt: movie.openDt,
      title: movie.movieNm,
      salesShare: movie.salesShare + '%',
      audiAcc: (movie.audiAcc / 10000).toFixed() + '만',
    };
  });

  console.log(moviesList);

  return (
    <div className='home'>
      {moviesList.map((movie) => (
        <div key={movie.rnum} className='movie_Container'>
          <div className='movie_Box'>
            <div>{movie.rank}위</div>
            <SearchMovie title={movie.title} openDt={movie.openDt.split('-').join('')} />
            <div>
              예매율: {movie.salesShare}
              누적관객수: {movie.audiAcc}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieRank;
