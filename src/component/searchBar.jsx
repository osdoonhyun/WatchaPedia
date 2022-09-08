import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


//KMBD ?�증?? ServiceKey= 777KP7DH9KI1K831H458
//KMDB 기본?�청 URL = https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2

const SearchBar = () => {
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const onGetMoviesInfoList = async (event) => {
    event.preventDefault();

    const json = await (
      await fetch(
        `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458&title=${title}&detail=Y`
      )
    ).json();
    // console.log(json);
    console.log(json.Data[0].Result);

    const moviesInfoList = json.Data[0].Result.map((x) => {
      let rectifyTitle = x.title;
      rectifyTitle = rectifyTitle.replace(/!HS/g, '');
      rectifyTitle = rectifyTitle.replace(/!HE/g, '');
      rectifyTitle = rectifyTitle.replace(/^\s+|\s+$/g, '');
      rectifyTitle = rectifyTitle.replace(/ +/g, ' ');
      //g : ?�역?�서

      return {
        movieSeq: x.movieSeq,
        title: rectifyTitle,
        titleEng: x.titleEng,
        actorAndProd: x.staffs.staff,
        runtime: x.runtime,
        rating: x.rating,
        plot: x.plots.plot[0].plotText,
        vods: x.vods.vod,
        posterUrl: x.posters.split('|')[0],
        stilUrls: x.stlls.split('|'),
        prodYear: x.prodYear,
        nation: x.nation,
        genre: x.genre,
        repRlsDate: x.repRlsDate,
      };
    });

    navigate('/SearchResult', { state: moviesInfoList });
    setTitle('');
  };

  const onChange = (event) => {
    let value = event.target.value;
    setTitle(value);
  };

  return (
    <>
      <form onSubmit={onGetMoviesInfoList}>
        <input type='text' placeholder='?�목?? ?�력?�세??' value={title} onChange={onChange} />
      </form>
    </>
  );
};

export default SearchBar;

/* 버튼 ?�그?? 기본?�으�? ?�?�이 submit?�라 onClick ?�성?? 줘도 onSubmit ?�성?�로 ?�동?�다.
onSubmit?? 주면 event.preventDefault();?? ?�다?�더?�고 ?�로고침?? ?�어버리??
버튼 ?�그?? 반드?? onClick?? ?�용?�고 event.preventDefault();�? ?�로고침?? 막도�? ?�다.
?�의 차이
onClick?� ?�터�? 못들?��??? ?�?? ?�로고침?? 기본?? ?�니�?,
onSubmit?� ?�터�? ?�어�? ?? ?�는 ?�?? ?�로고침?? 기본?�라??
event.preventDefault(); �? ?�용?�서 기본 ?�작?? 막아주어?? ?�다.*/
