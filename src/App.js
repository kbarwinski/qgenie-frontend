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
      <h1 className="text-2xl font-bold mb-4">QGenie</h1>
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
