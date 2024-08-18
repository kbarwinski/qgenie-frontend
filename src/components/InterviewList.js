import React from "react";

function InterviewList({ interviews, onGenerateQuestions }) {
  return (
    <div className="space-y-4">
      {interviews.map((interview) => (
        <div
          key={interview.interviewId}
          className="bg-white shadow-md rounded-lg p-4"
        >
          <h2 className="text-xl font-semibold">{interview.jobTitle}</h2>
          <p className="text-gray-600">{interview.jobDescription}</p>
          <p className="text-gray-600">
            Candidate: {interview.candidateCredentials}
          </p>
          <p className="text-gray-600">
            Due Date: {new Date(interview.dueDate).toLocaleDateString()}
          </p>
          <button
            onClick={() => onGenerateQuestions(interview)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Generate Questions
          </button>
        </div>
      ))}
    </div>
  );
}

export default InterviewList;
