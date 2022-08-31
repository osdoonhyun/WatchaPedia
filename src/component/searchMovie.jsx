import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function SearchMovie({title, openDt}) {
  const Navigate = useNavigate();
  const [moviesImg, setMoviesImg] = useState([]);

  //KMDB에서 title에 맞는 영화 불러옴
  const getMoviesImg = async () => {
    const json2 = await (
      await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&title=${title}&detail=Y`
      )
    ).json();
    setMoviesImg(json2.Data[0].Result);
  }
  
  useEffect(()=>{
    getMoviesImg();
  },[]);
  console.log('무비 이미지: ',moviesImg);

  //동일한 title에 맞는 영화 정보를 moviesImgList에 가공하여 저장 헌트 쳤을때 헌트가 여러개 불러온거
  const moviesImgList = moviesImg.map((moviesImg) => {
    let rectifyTitle = moviesImg.title;
    rectifyTitle = rectifyTitle.replace(/!HS/g, '');
    rectifyTitle = rectifyTitle.replace(/!HE/g, '');
    rectifyTitle = rectifyTitle.replace(/^\s+|\s+$/g, '');
    rectifyTitle = rectifyTitle.replace(/ +/g, ' ');
    return {
      title : rectifyTitle,
      titleEng: moviesImg.titleEng,
      prodYear: moviesImg.prodYear,
      posterUrl: moviesImg.posters.split('|')[0],
      stilUrl: moviesImg.stlls.split('|')[0],
      movieSeq: moviesImg.movieSeq,
      nation: moviesImg.nation,
      genre: moviesImg.genre,
      vods: moviesImg.vods.vod,
      actorAndProd : moviesImg.staffs.staff,
      runtime : moviesImg.runtime,
      rating : moviesImg.rating,
      plot : moviesImg.plots,
    };
  });

  //특정 영화 정보만 moviesInfo에 저장  헌트 하나만 불러온거
  let moviesInfo={};
  for(let i =0; i < moviesImgList.length; i++) {
    if(moviesImgList[i].prodYear === openDt || moviesImgList[i].title===title){
      moviesInfo = moviesImgList[i];
    }
  }

  const onClick = (event) => {
    const movieInfo = event.target.dataset.clicked_movie_info;
    Navigate('/MovieDetail', { state: movieInfo });
  }
  console.log('moviesInfo:',moviesInfo);

  console.log('prodYear:',moviesInfo.prodYear);
  console.log('titles:',moviesInfo.title);
  console.log(moviesInfo);
  return (
    <div onClick={onClick} className="moviesImg">
      <img 
        src={moviesInfo.posterUrl} 
        alt= {moviesInfo.title}
        data-clicked_movie_info={JSON.stringify(moviesInfo)}
      />
      <div data-clicked_movie_info={JSON.stringify(moviesInfo)}>{moviesInfo.title}</div>
      <div data-clicked_movie_info={JSON.stringify(moviesInfo)}>{moviesInfo.prodYear}</div>
    </div>
  );
}

export default SearchMovie;