import React, { useState, useEffect } from "react";
import { getLastInterviewMessage, createMessage } from "../api/api";

function GenerateQuestionsModal({ interview, onClose }) {
  const [character, setCharacter] = useState("");
  const [seniority, setSeniority] = useState("");
  const [notes, setNotes] = useState("");
  const [lastMessage, setLastMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLastMessage = async () => {
      setIsLoading(true);
      try {
        const message = await getLastInterviewMessage(interview.refId);
        setLastMessage(message);
      } catch (error) {
        console.error("Error fetching last message:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastMessage();
  }, [interview.refId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const messageData = {
        jobTitle: interview.jobTitle,
        jobDescription: interview.jobDescription,
        candidate: interview.candidateCredentials,
        interviewCharacter: character,
        jobSeniority: seniority,
        notes: notes,
      };
      const result = await createMessage(interview.refId, messageData);
      setLastMessage(result);
      // Reset form fields
      setCharacter("");
      setSeniority("");
      setNotes("");
    } catch (error) {
      console.error("Error in message creation process:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = character && seniority;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col lg:flex-row justify-center items-center p-4 overflow-auto">
      <div className="bg-white rounded-lg p-6 w-full lg:w-1/3 mb-4 lg:mb-0 lg:mr-4">
        <h2 className="text-xl font-bold mb-4">
          {interview?.candidateCredentials} - {interview?.jobTitle}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Interview Character</label>
            <select
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full p-2 border rounded hover:bg-gray-300 transition-all"
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
              className="w-full p-2 border rounded hover:bg-gray-300 transition-all"
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
              className="w-full p-2 border rounded hover:bg-gray-300 transition-all"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className={`w-full py-2 px-4 rounded transition-all ${
              isFormValid && !isSubmitting
                ? "bg-blue-500 hover:bg-blue-900 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "Generating..." : "Generate Questions"}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 w-full transition-all bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>

      {isLoading ? (
        <p>Loading last message...</p>
      ) : lastMessage ? (
        <div className="bg-white rounded-lg p-6 w-full lg:w-2/3 max-h-[80vh] overflow-auto">
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <h3 className="font-bold mb-2">Last questions set:</h3>
            {lastMessage.response.split("\n").map((line, index) => (
              <p key={index} className="mb-2">
                {line.trim() && `${line.trim()}`}
              </p>
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default GenerateQuestionsModal;
