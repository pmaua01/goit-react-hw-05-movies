import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { apiMovieDetail } from 'components/helpers/Api';
import { useState, useEffect, useRef } from 'react';
// import { Aditional } from './Aditional';

export const MovieDetail = () => {
  const [filmDetail, setFilmDetail] = useState([]);
  // const isFirstRender = useRef(null);
  const { id } = useParams();
  const location = useLocation();
  const controller = useRef(new AbortController());
  // console.log(isFirstRender);
  console.log('location on hook', location);

  useEffect(() => {
    const controllerAbort = controller.current;
    async function fetchFilmDetail() {
      try {
        const response = await apiMovieDetail(id, controllerAbort);
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

    // return () => {
    //   controllerAbort.abort();
    // };
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

  console.log('location.state.from', location.state.from);
  return (
    <main>
      <Link to={location.state.from}>
        <button type="button">Go back</button>
      </Link>
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

        <Link to="cast" state={{ from: location.state.from }}>
          Cast
        </Link>
        <Link to="reviews" state={{ from: location.state.from }}>
          Reviews
        </Link>

        <Outlet />
      </div>
    </main>
  );
};
