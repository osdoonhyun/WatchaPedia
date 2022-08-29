import React, { useState, useEffect } from "react";

function SearchMovie({title, openDt}) {
  const [moviesImg, setMoviesImg] = useState([]);

  //KMDB
  const getMoviesImg = async () => {
    const json2 = await (
      await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&title=${title}&detail=Y`
      )
    ).json();
    setMoviesImg(json2.Data[0].Result);
  }
  console.log('무비 이미지: ',moviesImg);
  useEffect(()=>{
      getMoviesImg();
  },[]);
    
  
  const moviesImgList = moviesImg.map((moviesImg) => {
    let rectifyTitle = moviesImg.title;
    rectifyTitle = rectifyTitle.replace(/\!HS/g, '');
    rectifyTitle = rectifyTitle.replace(/\!HE/g, '');
    rectifyTitle = rectifyTitle.replace(/^\s+|\s+$/g, '');
    rectifyTitle = rectifyTitle.replace(/ +/g, ' ');
    return {
      title : rectifyTitle,
      directorNm : moviesImg.directorNm,
      movieSeq : moviesImg.movieSeq,
      prodYear: moviesImg.prodYear,
      posterUrl: moviesImg.posters.split('|')[0],
    };
  });


  let posterUrl ='';
  for(let i =0; i < moviesImgList.length; i++) {
    if(moviesImgList[i].prodYear === openDt || moviesImgList[i].title===title){
      posterUrl = moviesImgList[i].posterUrl;
    }
  }

  return (
    <div className="moviesImg">
      <img src={posterUrl} alt= "posterUrl"/>
      {/* {moviesImgList.map((moviesImg)=> (
        <div key={moviesImg.movieSeq}>
          {moviesImg.prodYear}
          {moviesImg.posterUrl}
        </div>
      ))} */}

    </div>
  );
}

export default SearchMovie;