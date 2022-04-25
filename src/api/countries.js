import axios from 'axios';

export const getAllCountries = async () => {
  const options = {
    method: 'GET',
    url: `https://restcountries.com/v3.1/all`,
  };
  const { data } = await axios.request(options);

  return data;
};
