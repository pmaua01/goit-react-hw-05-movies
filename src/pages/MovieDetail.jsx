import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { apiMovieDetail } from 'components/helpers/Api';
import { useState, useEffect, Suspense } from 'react';
// import { Aditional } from './Aditional';

import css from '../components/main.module.css';

export const MovieDetail = () => {
  const [filmDetail, setFilmDetail] = useState([]);
  const [error, setError] = useState(null);
  // const isFirstRender = useRef(null);
  const { id } = useParams();
  const location = useLocation();

  // console.log(isFirstRender);
  console.log('location on hook', location);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchFilmDetail() {
      try {
        const response = await apiMovieDetail(id, controller);
        console.log('apiMovieDetail', response);
        const {
          poster_path,
          title,
          popularity,
          overview,
          release_date,
          genres,
          vote_average,
        } = response;
        const normilizeReleaseData = String(release_date).slice(0, 4);
        const normilizePopularity = Number(popularity).toFixed();
        const normilizedVoteAverage = Number(vote_average).toFixed();
        const normilizeGenre = genres.map(genre => genre.name).join(' ');
        setFilmDetail({
          poster_path,
          title,
          overview,
          normilizeReleaseData,
          normilizePopularity,
          normilizeGenre,
          normilizedVoteAverage,
        });
      } catch (error) {
        console.log('Error on catch', error.response.status);
        setError(error.response.status);
      }
    }
    fetchFilmDetail();
    return () => {
      controller.abort();
    };
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
    normilizeGenre,
    normilizedVoteAverage,
  } = filmDetail;

  const fromHref = location.state?.from ?? '/';
  console.log('error', error);

  if (error === 404) {
    return (
      <>
        <Link to={fromHref}>
          <button type="button">Go back</button>
        </Link>
        <div>Opps, try again later....</div>
      </>
    );
  }

  console.log('fromHref', fromHref);
  return (
    <main>
      <Link to={fromHref}>
        <button className={css.detailButton} type="button">
          Go back
        </button>
      </Link>
      <div className={css.filmInfo}>
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt=""
          width="300"
        />
        <div className={css.filmInfoText}>
          <h1>
            {title}({normilizeReleaseData})
          </h1>
          <p className={css.text}>User score:{normilizedVoteAverage * 10}%</p>
          <h2>Overview</h2>
          <p className={css.text}>{overview}</p>
          <h2>Genres</h2>
          <p className={css.text}>{normilizeGenre}</p>
        </div>
      </div>
      <div className={css.aditional}>
        <p className={css.textAditional}>Aditional information</p>
        <ul className={css.aditionalList}>
          <li>
            <Link to="cast" state={{ from: fromHref }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: fromHref }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>
      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  );
};
