import React, { useState,useEffect } from 'react';

function searchMovie({title, openDt}) {
  const [moviesImg, setMoviesImg] = useState([]);

  const getMoviesImg = async () => {
    const json2 = await (
      await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&detail=Y`
      )
    ).json();
    setMoviesImg(json2.Data[0].Result);
  }

  useEffect(()=> {
    getMoviesImg();
  },[]);

  const moviesImgList = moviesImg.map((moviesImg) => {
    return {
      prodYear: moviesImg.prodYear,
      posterUrl: moviesImg.posters.split('|')[0],
    };
  });

  console.log('이미지',moviesImgList[0]);
  console.log('title',title);
  console.log('openDt',openDt);

  console.log('ImgSeq', moviesImgList[0].prodYear);
  console.log('posterUrl', moviesImgList[0].posterUrl);

  return (
    <div className="moviesImg">
      {moviesImgList.map((moviesImg)=> (
        <div key={moviesImg.movieSeq}>
          <div>이미지랑께</div>
          {title}
          {moviesImg.prodYear}
          {moviesImg.posterUrl}
        </div>
      ))}
      <div>
        띠용
      </div>
    </div>
  );
}

export default searchMovie;