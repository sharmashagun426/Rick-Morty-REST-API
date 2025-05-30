import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const fetchCharacters = async (page: number = 1) => {
  const { data } = await axios.get(`${BASE_URL}/character?page=${page}`);
  return data;
};

export const fetchCharacterById = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/character/${id}`);
  return data;
};
