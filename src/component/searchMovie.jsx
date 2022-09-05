import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchMovie({ movieCd, title, openDt }) {
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

  useEffect(() => {
    const getMoviesImg = async () => {
      const json2 = await (
        await fetch(
          `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&title=${title}&detail=Y`
        )
      ).json();
      setMoviesImg(json2.Data[0].Result);
    };
    getMoviesImg();
  }, [title]);
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
      stilUrls: m.stlls.split('|'),
      movieSeq: m.movieSeq,
      nation: m.nation,
      genre: m.genre,
      vods: m.vods.vod,
      actorAndProd: m.staffs.staff,
      runtime: m.runtime,
      rating: m.rating,
      plot: m.plots.plot[0].plotText,
      repRlsDate: m.repRlsDate,
      kmdbMovieCode: m.Codes.Code[0].CodeNo,
    };
  });

  //특정 영화 정보만 moviesInfo에 저장  헌트 하나만 불러온거
  let moviesInfo = {};
  for (let i = 0; i < moviesImgList.length; i++) {
    //코드가 같거나 (개봉일자와 제목이 둘다 같거나)
    if (
      moviesImgList[i].kmdbMovieCode === movieCd ||
      (moviesImgList[i].repRlsDate === openDt.replaceAll('-', '') &&
        moviesImgList[i].title.replaceAll(' ', '') === title.replaceAll(' ', ''))
    ) {
      moviesInfo = moviesImgList[i];
      break;
    }
  }

  const onClick = (event) => {
    const movieInfo = event.target.dataset.clicked_movie_info;
    const movieInfoObj = JSON.parse(movieInfo);
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
