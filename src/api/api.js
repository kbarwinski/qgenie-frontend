import axios from "axios";

const API_BASE_URL = "http://your-api-base-url";

export const getOrCreateInterview = async (interviewId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/interviews/getorcreate`,
      { interviewId }
    );
    return response.data;
  } catch (error) {
    console.error("Error getting or creating interview:", error);
    throw error;
  }
};

export const generateQuestions = async (
  interviewId,
  character,
  seniority,
  notes
) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/interviews/${interviewId}/questions`,
      {
        character,
        seniority,
        notes,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error generating questions:", error);
    throw error;
  }
};
