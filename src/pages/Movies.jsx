import { SearchBox } from 'components/SearchBox';
import { useSearchParams, useLocation } from 'react-router-dom';
import { apiFindMovie } from 'helpers/Api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import css from '../components/main.module.css';
// import { Outlet } from 'react-router-dom';
export const Movies = () => {
  const [searchParams, setSeacrhParams] = useSearchParams();
  const [anwerApi, setAnswerApi] = useState([]);
  const location = useLocation();
  const searchQuery = searchParams.get('query') ?? '';
  console.log('searchquery', searchQuery);

  const onChange = query => {
    console.log(query);
    setSeacrhParams(query !== '' ? { query } : {});
  };

  useEffect(() => {
    const controller = new AbortController();
    if (searchQuery === '') {
      return;
    }
    apiFindMovie(searchQuery, controller).then(setAnswerApi);
    return () => {
      controller.abort();
    };
  }, [searchQuery]);

  console.log('location in movie', location);
  return (
    <div>
      <SearchBox onChangeQuery={onChange} />
      {/* <Outlet /> */}
      {anwerApi.length > 0 && (
        <ul className={css.homeList}>
          {anwerApi.map(({ id, title, name }) => (
            <li className={css.homeListItem} key={id}>
              <Link to={`${id}`} state={{ from: location }}>
                {title || name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
