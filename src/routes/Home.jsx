import React, { useEffect } from 'react';


function Home() {
  useEffect(()=>{
    fetch(`https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=777KP7DH9KI1K831H458`
    )
    .then((Response)=> Response.json())
    .then((json)=>console.log(json));
  },[]);
  
  return (
    <div className="home">
      <div className="home_container">
        <p>박스오피스 순위</p>

      </div>
    </div>
  );
}

export default Home;