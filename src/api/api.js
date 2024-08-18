import axios from "axios";

const API_BASE_URL = "https://localhost:7152";

export const getLastInterviewMessage = async (refId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/interviews/${refId}/lastmessage`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null; // No message found
    }
    console.error("Error getting last interview message:", error);
    throw error;
  }
};

export const createMessage = async (refId, messageData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/interviews/${refId}/messages`,
      messageData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
};