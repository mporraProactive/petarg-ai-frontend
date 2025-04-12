
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const CurrentContext: React.FC = () => {
  const [context, setContext] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContext = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          "https://chatbot-backend.agreeablerock-8abd7837.brazilsouth.azurecontainerapps.io/getcontext/"
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        setContext(data.context || "");
      } catch (error) {
        console.error("Error fetching context:", error);
        setError("Ocurrió un error al obtener el contexto. Por favor, recarga la página.");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContext();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in h-full">
      <div className="bg-fiuba-500 text-white p-4">
        <h2 className="text-xl font-bold">Texto Actual</h2>
      </div>
      
      <div className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="h-8 w-8 text-fiuba-500 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-3 bg-red-50 border border-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[300px] max-h-[70vh] overflow-y-auto">
            {context ? (
              <div className="whitespace-pre-wrap">{context}</div>
            ) : (
              <div className="text-gray-500 italic">
                No hay contexto disponible. Agrega nuevo contenido usando el formulario.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentContext;
