import axios from 'axios';
import API_BASE_URL from '../apiConfig';

export const deletePropertyById = async (id: string) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/properties/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('Error deleting property:', error.message);
    throw error;
  }
};
