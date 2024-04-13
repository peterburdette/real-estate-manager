import axios from 'axios';
import API_BASE_URL from './../apiConfig';

export const GetProperties = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching property data:', error.message);
    throw error;
  }
};
