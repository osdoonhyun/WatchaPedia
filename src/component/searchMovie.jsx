import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchMovie({ title, openDt }) {
  const Navigate = useNavigate();
  const [moviesImg, setMoviesImg] = useState([]);

  //KMDB에서 title에 맞는 영화 불러옴
  // useEffect(()=>{
  //   const getMoviesImg = async () => {
  //     const json2 = await (
  //       await fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&title=${title}&detail=Y`
  //       )
  //     ).json();
  //     setMoviesImg(json2.Data[0].Result);
  //   }
  //   getMoviesImg();
  //   console.log('지금 받아온 무비이미지',moviesImg);
  // },[moviesImg,title]);
  // console.log('무비 이미지: ',moviesImg);
  const getMoviesImg = async () => {
    const json2 = await (
      await fetch(
        `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&title=${title}&detail=Y`
      )
    ).json();
    setMoviesImg(json2.Data[0].Result);
  };

  useEffect(() => {
    getMoviesImg();
  }, []);

  //동일한 title에 맞는 영화 정보를 moviesImgList에 가공하여 저장 헌트 쳤을때 헌트가 여러개 불러온거
  const moviesImgList = moviesImg.map((m) => {
    let rectifyTitle = m.title;
    rectifyTitle = rectifyTitle.replace(/!HS/g, '');
    rectifyTitle = rectifyTitle.replace(/!HE/g, '');
    rectifyTitle = rectifyTitle.replace(/^\s+|\s+$/g, '');
    rectifyTitle = rectifyTitle.replace(/ +/g, ' ');
    return {
      title: rectifyTitle,
      titleEng: m.titleEng,
      prodYear: m.prodYear,
      posterUrl: m.posters.split('|')[0],
      stilUrl: m.stlls.split('|')[0],
      movieSeq: m.movieSeq,
      nation: m.nation,
      genre: m.genre,
      vods: m.vods.vod,
      actorAndProd: m.staffs.staff,
      runtime: m.runtime,
      rating: m.rating,
      plot: m.plots,
      repRlsDate: m.repRlsDate,
    };
  });

  //특정 영화 정보만 moviesInfo에 저장  헌트 하나만 불러온거
  let moviesInfo = {};
  for (let i = 0; i < moviesImgList.length; i++) {
    if (moviesImgList[i].repRlsDate === openDt && moviesImgList[i].title === title) {
      //개봉연도가 아닌 개봉날짜까지 일치로 변경
      console.log(title, moviesImgList[i].repRlsDate, openDt);
      moviesInfo = moviesImgList[i];
      break;
    }
  }

  const onClick = (event) => {
    const movieInfo = event.target.dataset.clicked_movie_info;
    const movieInfoObj = JSON.parse(movieInfo); //string을 객체로 바꿔서 movieSeq를 Id 값으로 넘겨줌
    Navigate(`/MovieDetail/${movieInfoObj.movieSeq}`, { state: movieInfo });
  };

  return (
    <div onClick={onClick} className='moviesImg'>
      <div>
        <img src={moviesInfo.posterUrl} alt={moviesInfo.title} data-clicked_movie_info={JSON.stringify(moviesInfo)} />
        <div data-clicked_movie_info={JSON.stringify(moviesInfo)}>{moviesInfo.title}</div>
        <div data-clicked_movie_info={JSON.stringify(moviesInfo)}>{moviesInfo.prodYear}</div>
      </div>
    </div>
  );
}

export default SearchMovie;
