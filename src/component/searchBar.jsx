import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//KMBD 인증키 ServiceKey= 777KP7DH9KI1K831H458
//KMDB 기본요청 URL = https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2

const SearchBar = () => {
  const [title, setTitle] = useState("");
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
      rectifyTitle = rectifyTitle.replace(/!HS/g, "");
      rectifyTitle = rectifyTitle.replace(/!HE/g, "");
      rectifyTitle = rectifyTitle.replace(/^\s+|\s+$/g, "");
      rectifyTitle = rectifyTitle.replace(/ +/g, " ");
      //g : 전역에서

      return {
        movieSeq: x.movieSeq,
        title: rectifyTitle,
        titleEng: x.titleEng,
        actorAndProd: x.staffs.staff,
        runtime: x.runtime,
        rating: x.rating,
        plot: x.plots.plot[0].plotText,
        vods: x.vods.vod,
        posterUrl: x.posters.split("|")[0],
        stilUrls: x.stlls.split("|"),
        prodYear: x.prodYear,
        nation: x.nation,
        genre: x.genre,
        repRlsDate: x.repRlsDate,
      };
    });

    navigate("/SearchResult", { state: moviesInfoList });
    setTitle("");
  };

  const onChange = (event) => {
    let value = event.target.value;
    setTitle(value);
  };

  return (
    <>
      <form onSubmit={onGetMoviesInfoList}>
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={onChange}
          width={"400"}
          height="300"
        />
      </form>
    </>
  );
};

export default SearchBar;

/* 버튼 태그는 기본적으로 타입이 submit이라 onClick 속성을 줘도 onSubmit 속성으로 작동한다.
onSubmit을 주면 event.preventDefault();이 있다하더라고 새로고침이 되어버리니
버튼 태그는 반드시 onClick을 사용하고 event.preventDefault();로 새로고침을 막도록 한다.
둘의 차이
onClick은 엔터로 못들어가는 대신 새로고침이 기본이 아니며,
onSubmit은 엔터로 들어갈 수 있는 대신 새로고침이 기본이라서
event.preventDefault(); 를 사용해서 기본 동작을 막아주어야 한다.*/
