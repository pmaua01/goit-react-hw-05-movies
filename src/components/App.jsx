import { Route, Routes, NavLink } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Home } from 'pages/Home';
import { NotFound } from 'pages/NotFound';
import css from '../components/main.module.css';
// import { Movies } from 'pages/Movies';
// import { MovieDetail } from 'pages/MovieDetail';
// import { Cast } from 'pages/Cast';
// import { Reviews } from 'pages/Reviewes';
// import { useState } from 'react';
const Movies = lazy(() =>
  import('../pages/Movies').then(module => ({
    ...module,
    default: module.Movies,
  }))
);

const MovieDetail = lazy(() =>
  import('../pages/MovieDetail').then(module => ({
    ...module,
    default: module.MovieDetail,
  }))
);

const Cast = lazy(() =>
  import('./Cast').then(module => ({
    ...module,
    default: module.Cast,
  }))
);

const Reviews = lazy(() =>
  import('./Reviewes').then(module => ({
    ...module,
    default: module.Reviews,
  }))
);

export const App = () => {
  return (
    <div style={{}}>
      <nav className={css.seacrhbar}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${css.navlink} ${isActive ? css.active : undefined}`
          }
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${css.navlink} ${isActive ? css.active : undefined}`
          }
          to="/movies"
        >
          Movies
        </NavLink>
      </nav>
      <Suspense>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
};

// <Route path=":id" element={<MovieDetail />}>
//   <Route path="cast" element={<Cast />} />
//   <Route path="reviews" element={<Reviews />} />
// </Route>;
