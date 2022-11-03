import { useParams, Link, Outlet } from 'react-router-dom';
import { apiMovieDetail } from 'components/helpers/Api';
import { useState, useEffect } from 'react';
// import { Aditional } from './Aditional';

export const MovieDetail = () => {
  const [filmDetail, setFilmDetail] = useState([]);
  // const isFirstRender = useRef(null);
  const { id } = useParams();
  // console.log(isFirstRender);

  useEffect(() => {
    async function fetchFilmDetail() {
      try {
        const response = await apiMovieDetail(id);
        const {
          poster_path,
          title,
          popularity,
          overview,
          release_date,
          genres,
        } = response;
        const normilizeReleaseData = String(release_date).slice(0, 4);
        const normilizePopularity = Number(popularity).toFixed();
        const normilizeGenre = genres.map(genre => genre.name).join(' ');
        setFilmDetail({
          poster_path,
          title,
          overview,
          normilizeReleaseData,
          normilizePopularity,
          normilizeGenre,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchFilmDetail();
  }, [id]);

  // const { poster_path, title, popularity, overview, release_date, genres } =
  //   filmDetail;
  // const normilizeReleaseData = String(release_date).slice(0, 4);
  // const normilizePopularity = Number(popularity).toFixed();
  // const normilizeGenre = genres.map(genre => genre.name);
  const {
    poster_path,
    title,
    overview,
    normilizeReleaseData,
    normilizePopularity,
    normilizeGenre,
  } = filmDetail;
  return (
    <main>
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
      <div>
        <h1>
          {title}({normilizeReleaseData})
        </h1>
        <p>User score:{normilizePopularity}%</p>
        <h2>Overview</h2>
        <p>{overview}</p>
        <h2>Genres</h2>
        <p>{normilizeGenre}</p>
      </div>
      <div>
        <h1>Aditional information</h1>

        <Link to="cast">Cast</Link>

        <p>Rewiev</p>
        <Outlet />
      </div>
    </main>
  );
};
