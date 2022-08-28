import MovieRank from "../component/movieRank";

function Home() {

  return (
    <div className="home">
      <div className="home_container">
        <p>박스오피스 순위</p>
        <MovieRank  />
      </div>
    </div>
  );
}

export default Home;