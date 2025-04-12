
import React from "react";
import CurrentContext from "../components/CurrentContext";
import AddContextForm from "../components/AddContextForm";

const Contexto: React.FC = () => {
  return (
    <div className="container mx-auto p-4 md:p-6 md:pb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div>
          <CurrentContext />
        </div>
        <div>
          <AddContextForm />
        </div>
      </div>
    </div>
  );
};

export default Contexto;
