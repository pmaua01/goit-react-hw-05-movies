import { api } from '../components/helpers/Api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [response, setResponse] = useState([]);
  // const [id, SetId] = useState('');

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
      <h1>Tranding today</h1>
      <ul>
        {response.map(({ title, id, name }) => {
          return (
            <li key={id}>
              <Link to={`/movies/${id}`}>{title || name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};
