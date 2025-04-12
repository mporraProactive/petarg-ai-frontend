
import React, { useState } from "react";
import Chatbot from "../components/Chatbot";
import ThesisInfo from "../components/ThesisInfo";

const Home: React.FC = () => {
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="container mx-auto p-4 md:p-6 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <Chatbot userId={userId} onUserIdChange={setUserId} />
        </div>
        <div>
          <ThesisInfo />
        </div>
      </div>
    </div>
  );
};

export default Home;
