import React from "react";
import { fetchData } from "../../app/data";
import Banner from "../../components/Banner/Banner.component";
import Navbar from "../../components/navbar/Navbar.component";
import Row from "../../components/Row/Row.component";
import styles from "./homescreen.module.scss";
function HomeScreen() {
  return (
    <div className={styles.homescreen}>
      <Navbar />
      <Banner type="tv" />
      <Row
        title="Netflix Originals"
        fetchUrl={fetchData.fetchNetflixOriginals}
        isLargeRow="true"
        type="tv"
      />
      <Row
        title="Trending Now"
        fetchUrl={fetchData.fetchTrending}
        type="movie"
      />
      <Row title="Top Rated" fetchUrl={fetchData.fetchTopRated} type="movie" />
      <Row
        title="Action Movies"
        fetchUrl={fetchData.fetchActionMovies}
        type="movie"
      />
      <Row
        title="Comedy Movies"
        fetchUrl={fetchData.fetchComedyMovies}
        type="movie"
      />
      <Row
        title="Horror Movies"
        fetchUrl={fetchData.fetchHorrorMovies}
        type="movie"
      />
      <Row
        title="Romance Movies"
        fetchUrl={fetchData.fetchRomanceMovies}
        type="movie"
      />
      <Row
        title="Documentaries"
        fetchUrl={fetchData.fetchDocumentaries}
        type="movie"
      />
      <Row title="My List" isMyList="true" />
    </div>
  );
}

export default HomeScreen;
