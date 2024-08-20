import React, { useState, useEffect } from "react";
import { getLastInterviewMessage, createMessage } from "../api/api";

function GenerateQuestionsModal({ interview, onClose }) {
  const [character, setCharacter] = useState("");
  const [seniority, setSeniority] = useState("");
  const [textareaContent, setTextareaContent] = useState("");
  const [isOutputMode, setIsOutputMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalClassName, setModalClassName] = useState("bg-white rounded-lg p-6 w-full max-w-4xl border-solid border-4 transition-colors duration-300 border-blue-300");
  const [copyMessage, setCopyMessage] = useState("");

  useEffect(() => {
    const fetchLastMessage = async () => {
      setIsLoading(true);
      try {
        const message = await getLastInterviewMessage(interview.refId);
        if (message) {
          setTextareaContent(message.response);
          setIsOutputMode(true);
          setModalClassName("bg-white rounded-lg p-6 w-full max-w-4xl border-solid border-4 transition-colors duration-300 border-orange-600");
        }
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
        notes: textareaContent,
      };
      const result = await createMessage(interview.refId, messageData);
      setTextareaContent(result.response);
      setIsOutputMode(true);
      setModalClassName("bg-white rounded-lg p-6 w-full max-w-4xl border-solid border-2 transition-colors duration-300 border-orange-500");
      setCharacter("");
      setSeniority("");
    } catch (error) {
      console.error("Error in message creation process:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewQuestions = () => {
    setIsOutputMode(false);
    setTextareaContent("");
    setModalClassName("bg-white rounded-lg p-6 w-full max-w-4xl border-solid border-2 transition-colors duration-300 border-blue-300");
  };

  const copyToClipboard = () => {
    if (isOutputMode) {
      navigator.clipboard.writeText(textareaContent).then(() => {
        setCopyMessage("Questions copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 3000); // Clear message after 3 seconds
      });
    }
  };

  const isFormValid = character && seniority && (!isOutputMode || textareaContent.trim() !== "");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 transition-all animate-fadein duration-250 flex justify-center items-center p-4 overflow-auto">
      <div className={modalClassName}>
      <div className="relative">
          <h2 className="text-xl font-bold mb-4">
            {interview?.credentials} - {interview?.jobTitle}
          </h2>
          <div className="absolute top-0 right-0  text-red-500 text-xs px-2 py-1 rounded">
            *Generated in whole or part with Generative AI
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
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
            <div>
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
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              {isOutputMode ? "Generated Questions" : "Additional Notes"}
            </label>
            <textarea
              value={textareaContent}
              onChange={(e) => setTextareaContent(e.target.value)}
              onClick={copyToClipboard}
              className="w-full p-2 border rounded hover:bg-gray-300 transition-all"
              rows="10"
              readOnly={isOutputMode}
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              disabled={!isOutputMode}
              onClick={handleNewQuestions}
              className={`py-2 px-4 rounded-lg transition-all ${
                isOutputMode
                  ? "bg-blue-500 hover:bg-blue-900 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              New Questions
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`py-2 px-4 rounded-lg transition-all ${
                isFormValid && !isSubmitting && !isOutputMode
                  ? "bg-orange-500 hover:bg-orange-900 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isSubmitting ? "Generating..." : "Generate Questions"}
            </button>
          </div>
        </form>

        {copyMessage && (
          <div className="text-green-600 mb-4 text-center">{copyMessage}</div>
        )}

        <button
          onClick={onClose}
          className="w-full transition-all bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default GenerateQuestionsModal;