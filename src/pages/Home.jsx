import { api } from '../components/helpers/Api';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import css from '../components/main.module.css';

export const Home = () => {
  const [response, setResponse] = useState([]);
  // const [id, SetId] = useState('');
  const location = useLocation();

  useEffect(() => {
    async function fetch() {
      const answerApi = await api();
      setResponse(answerApi);
    }

    fetch();
  }, []);

  console.log(response);

  return (
    <>
      <h1 className={css.homeTitle}>Tranding today</h1>
      <ul className={css.homeList}>
        {response.map(({ title, id, name }) => {
          return (
            <li className={css.homeListItem} key={id}>
              <Link to={`/movies/${id}`} state={{ from: location }}>
                {title || name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
