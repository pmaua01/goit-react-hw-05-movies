import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiCast } from 'helpers/Api';
import css from '../components/main.module.css';

export const Cast = () => {
  const [answerApiCast, setAnswerApiCast] = useState(null);
  // const [arrayId, setArratId] = useState([]);
  // const [getImgActor, setImgActor] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const controller = new AbortController();
    async function fetchFilmCast() {
      const response = await apiCast(id, controller);
      console.log(response);
      setAnswerApiCast(response);
    }
    fetchFilmCast();
    return () => {
      controller.abort();
    };
  }, [id]);

  if (!answerApiCast) {
    return;
  }

  // getImgActorFn(6807).then(r => console.log(r));

  return (
    <div className={css.cast}>
      {answerApiCast.length === 0 && <div>Sorry no results</div>}
      <ul>
        {answerApiCast.map(({ id, character, profile_path, name }) => {
          return (
            <li key={id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
                alt=""
                width="120"
              />
              {name}
              <p>Character:{character ? character : 'No information'}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
