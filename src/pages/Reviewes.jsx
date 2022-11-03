import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiReviewes } from 'components/helpers/Api';
export const Reviews = () => {
  const { id } = useParams();
  const [anserApiReviewes, setAnserApiReviewes] = useState(null);
  useEffect(() => {
    async function fetchFilmReviewes() {
      const response = await apiReviewes(id);
      console.log(response);
      setAnserApiReviewes(response);
    }
    fetchFilmReviewes();
  }, [id]);
  console.log(id);

  if (!anserApiReviewes) {
    return;
  }
  return (
    <div>
      {anserApiReviewes.map(el => {
        return <p key={id}>{el.content}</p>;
      })}
    </div>
  );
};
