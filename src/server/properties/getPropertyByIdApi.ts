import axios from 'axios';
import API_BASE_URL from '../apiConfig';

export const getPropertyById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error fetching property data:', error.message);
    throw error;
  }
};
