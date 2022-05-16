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
      <Banner />
      <Row
        title="Netflix Originals"
        fetchUrl={fetchData.fetchNetflixOriginals}
        isLargeRow="true"
      />
      <Row title="Trending Now" fetchUrl={fetchData.fetchTrending} />
      <Row title="Top Rated" fetchUrl={fetchData.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={fetchData.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={fetchData.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={fetchData.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={fetchData.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={fetchData.fetchDocumentaries} />
    </div>
  );
}

export default HomeScreen;
