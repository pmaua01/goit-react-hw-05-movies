import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiReviewes } from 'helpers/Api';
export const Reviews = () => {
  const { id } = useParams();
  const [anserApiReviewes, setAnserApiReviewes] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function fetchFilmReviewes() {
      const response = await apiReviewes(id, controller);
      console.log(response);
      setAnserApiReviewes(response);
      console.log(response);
    }
    fetchFilmReviewes();
    return () => {
      controller.abort();
    };
  }, [id]);
  console.log(id);

  if (!anserApiReviewes) {
    return;
  }

  return (
    <div>
      <ul>
        {anserApiReviewes.length === 0 && <p>Sorry not results</p>}
        {anserApiReviewes.map(({ content, id, author }) => {
          return (
            <li key={id}>
              <h2>Author:{author}</h2>
              {content}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
