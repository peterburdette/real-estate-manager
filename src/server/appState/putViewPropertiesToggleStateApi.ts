import axios from 'axios';
import API_BASE_URL from '../apiConfig';

export const updateViewPropertiesToggleState = async (
  id: string,
  viewMode: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/viewPropertiesToggleState/${id}`,
      { viewMode }
    );
    return response.data;
  } catch (error: any) {
    console.error('Error updating viewPropertiesToggleState:', error.message);
    throw error;
  }
};
