import { SearchBox } from 'components/SearchBox';
import { useSearchParams, useLocation } from 'react-router-dom';
import { apiFindMovie } from 'components/helpers/Api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    if (searchQuery === '') {
      return;
    }
    apiFindMovie(searchQuery).then(setAnswerApi);
  }, [searchQuery]);

  console.log('location in movie', location);
  return (
    <div>
      <SearchBox onChangeQuery={onChange} />
      {/* <Outlet /> */}
      {anwerApi.length > 0 && (
        <ul>
          {anwerApi.map(({ id, title, name }) => (
            <li key={id}>
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
