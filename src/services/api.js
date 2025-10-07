import axios from 'axios';

export const getCoinData = async (id) => {
    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
    return response.data;
};
