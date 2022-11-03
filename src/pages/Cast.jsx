import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiCast, apiActorImg } from 'components/helpers/Api';

export const Cast = () => {
  const [answerApiCast, setAnswerApiCast] = useState(null);
  // const [arrayId, setArratId] = useState([]);
  // const [getImgActor, setImgActor] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    async function fetchFilmCast() {
      const response = await apiCast(id);
      console.log(response);
      setAnswerApiCast(response);
    }
    fetchFilmCast();
  }, [id]);

  const getImgActorFn = async id => {
    const response = await apiActorImg(id);
    // console.log(response);

    return response;
  };

  if (!answerApiCast) {
    return;
  }

  getImgActorFn(6807).then(r => console.log(r));

  return (
    <div>
      <ul>
        {answerApiCast.map(cast => {
          return (
            <li key={cast.id}>
              {cast.name},{cast.id}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
