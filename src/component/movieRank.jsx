import React, { useState,useEffect } from 'react';

function Home() {
  const [movies, setMovies]=useState([]);
  const getMovies = async () => {
    const json = await(
      await fetch(`http://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=9674dd7ff57f3049d68c7349e58025ba&targetDt=20220827&itemPerPage=10`
      )
    ).json();
    // setMovies(json.weeklyBoxOfficeList.movies);
    setMovies(json['boxOfficeResult']['dailyBoxOfficeList']);
  }
  useEffect(()=>{
    getMovies();
  },[]);

  return (
    <div className="home">
      {movies.map((movie) => (
        <div key={movie.rnum}>
          <div>이미지</div>
          {movie.rank}
          {movie.movieNm}
          {movie.openDt.slice(0,4)}
          <div>
            예매율 {movie.salesShare}%
            누적관객수: {movie.audiAcc}
          </div>

        </div>
      ))}
    </div>
  );
}

export default Home;