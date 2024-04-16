import axios from 'axios';
import API_BASE_URL from '../apiConfig';

export const getViewPropertiesToggleState = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/viewPropertiesToggleState/`
    );
    return response.data;
  } catch (error: any) {
    console.error(
      'Error fetching viewPropertiesToggleState data:',
      error.message
    );
    throw error;
  }
};
