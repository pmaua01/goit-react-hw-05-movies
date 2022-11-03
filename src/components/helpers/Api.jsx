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

export const apiMovieDetail = async id => {
  const response = await axios.get(`${BASE_URL}movie/${id}`, {
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data;
};

export const apiCast = async id => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data.cast;
};

export const apiActorImg = async id => {
  const response = await axios.get(`${BASE_URL}/person/${id}/images`, {
    params: {
      api_key: BASE_KEY,
    },
  });
  return response.data.id;
};
