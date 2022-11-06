import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3/';
const BASE_KEY = 'a97f5a48286213b4292b81d1cb5cf0d2';

export const api = async () => {
  const response = await axios.get(`${BASE_URL}trending/all/day`, {
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data.results;
};

export const apiMovieDetail = async (id, controller) => {
  console.log(controller);
  const response = await axios.get(`${BASE_URL}movie/${id}`, {
    signal: controller.signal,
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data;
};

export const apiCast = async (id, controller) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    signal: controller.signal,
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data.cast;
};

// export const apiActorImg = async id => {
//   const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
//     params: {
//       api_key: BASE_KEY,
//     },
//   });
//   return response.data.id;
// };

export const apiReviewes = async (id, controller) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
    signal: controller.signal,
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data.results;
};

export const apiFindMovie = async (query, controller) => {
  const response = await axios.get(`${BASE_URL}search/movie`, {
    signal: controller.signal,
    params: {
      api_key: BASE_KEY,
      query: query,
    },
  });
  return response.data.results;
};
