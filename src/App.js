import React, { useState } from "react";
import InterviewList from "./components/InterviewList";
import GenerateQuestionsModal from "./components/GenerateQuestionsModal";
import { dummyInterviews } from "./const/DummyInterviews";

function App() {
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateQuestions = (interview) => {
    setSelectedInterview(interview);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <img src="img/qgenie.svg" alt="QGenie Logo" className="w-128 h-24" />
      <InterviewList
        interviews={dummyInterviews}
        onGenerateQuestions={handleGenerateQuestions}
      />
      {isModalOpen && (
        <GenerateQuestionsModal
          interview={selectedInterview}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
