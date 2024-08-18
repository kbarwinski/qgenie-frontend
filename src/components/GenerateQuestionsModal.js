import React, { useState } from "react";
import { getOrCreateInterview, generateQuestions } from "../api/api";

function GenerateQuestionsModal({ interview, onClose }) {
  const [character, setCharacter] = useState("");
  const [seniority, setSeniority] = useState("");
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await getOrCreateInterview(interview);

      const result = await generateQuestions(
        interview,
        character,
        seniority,
        notes
      );
      setQuestions(result.response);
    } catch (error) {
      console.error("Error in question generation process:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = character && seniority;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">
          {interview?.candidateCredentials} - {interview?.jobTitle}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Interview Character</label>
            <select
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select character</option>
              <option value="HR">HR Prescreening</option>
              <option value="Technical">Technical Interview</option>
              <option value="Manager">Director/Manager Interview</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Job Seniority</label>
            <select
              value={seniority}
              onChange={(e) => setSeniority(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select seniority</option>
              <option value="Junior">Junior</option>
              <option value="Associate">Associate</option>
              <option value="Mid">Mid</option>
              <option value="Senior">Senior</option>
              <option value="C-Level">C-Level</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Additional Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className={`w-full py-2 px-4 rounded ${
              isFormValid && !isLoading
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isLoading ? "Generating..." : "Generate Questions"}
          </button>
        </form>
        {questions.length > 0 && (
          <div className="mt-4">
            <h3 className="font-bold mb-2">Generated Questions:</h3>
            <ul className="list-disc pl-5">
              {questions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default GenerateQuestionsModal;
