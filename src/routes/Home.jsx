import MovieRank from "../component/movieRank";
import "../component/styles.css";
function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <div className="home_p">
          <p>박스오피스 순위</p>
        </div>
        <MovieRank />
      </div>
    </div>
  );
}

export default Home;
