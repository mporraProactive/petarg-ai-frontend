
import React, { useState, useEffect } from "react";
import { formatDateForAPI } from "../utils/helpers";
import { Calendar, ChevronDown, Loader2 } from "lucide-react";
import CategorySelector from "./CategorySelector";
import CategoryMetricsView from "./CategoryMetricsView";

interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface FormattedMetricsData {
  [category: string]: {
    count: number;
    avg_score: number;
    std_score: number;
    scores: number[];
    good_questions: {
      input: string;
      output: string;
      score: number;
    }[];
    bad_questions: {
      input: string;
      output: string;
      score: number;
    }[];
    best_questions: {
      input: string;
      output: string;
      score: number;
    }[];
    worst_questions: {
      input: string;
      output: string;
      score: number;
    }[];
    clusters: {
      representative: string;
      questions: string[];
      count: number;
    }[];
  };
}

const MetricsReport: React.FC = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    endDate: new Date(),
  });
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [metricsData, setMetricsData] = useState<FormattedMetricsData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);
  
  const startPolling = () => {
    const interval = setInterval(async () => {
      try {
        const formattedStartDate = formatDateForAPI(dateRange.startDate);
        const formattedEndDate = formatDateForAPI(dateRange.endDate);
        
        const response = await fetch(
          `https://chatbot-backend.agreeablerock-8abd7837.brazilsouth.azurecontainerapps.io/getreport/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data === false) {
          // Still processing
          setIsProcessing(true);
        } else {
          // We have data
          setMetricsData(data);
          setIsProcessing(false);
          clearInterval(interval);
          setPollingInterval(null);
          
          // Select the first category by default
          if (data && Object.keys(data).length > 0) {
            setSelectedCategory(Object.keys(data)[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching metrics:", error);
        setError("Ocurrió un error al obtener las métricas. Por favor, intenta nuevamente.");
        setIsProcessing(false);
        clearInterval(interval);
        setPollingInterval(null);
      }
    }, 10000); // Poll every 10 seconds
    
    setPollingInterval(interval);
  };
  
  const handleFetchMetrics = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formattedStartDate = formatDateForAPI(dateRange.startDate);
      const formattedEndDate = formatDateForAPI(dateRange.endDate);
      
      const response = await fetch(
        `https://chatbot-backend.agreeablerock-8abd7837.brazilsouth.azurecontainerapps.io/getreport/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data === false) {
        // Start polling for results
        setIsProcessing(true);
        startPolling();
      } else {
        // We already have data
        setMetricsData(data);
        
        // Select the first category by default
        if (data && Object.keys(data).length > 0) {
          setSelectedCategory(Object.keys(data)[0]);
        }
      }
    } catch (error) {
      console.error("Error fetching metrics:", error);
      setError("Ocurrió un error al obtener las métricas. Por favor, intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
      <div className="bg-fiuba-500 text-white p-4">
        <h2 className="text-xl font-bold">Métricas</h2>
        <p className="mt-1 text-white/90">
          Visualización de las categorías de preguntas, su rendimiento y calidad para detectar oportunidades de mejora en el chatbot.
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Inicio
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateRange.startDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    startDate: new Date(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fiuba-500 focus:border-transparent pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha Fin
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateRange.endDate.toISOString().split("T")[0]}
                onChange={(e) =>
                  setDateRange((prev) => ({
                    ...prev,
                    endDate: new Date(e.target.value),
                  }))
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fiuba-500 focus:border-transparent pl-10"
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>
          </div>
        </div>
        
        <button
          onClick={handleFetchMetrics}
          disabled={isLoading || isProcessing}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            isLoading || isProcessing
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-fiuba-500 text-white hover:bg-fiuba-600"
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Cargando...
            </span>
          ) : isProcessing ? (
            <span className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2 h-5 w-5" />
              Procesando métricas...
            </span>
          ) : (
            "Obtener Métricas"
          )}
        </button>
        
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        
        {metricsData && !isProcessing && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Resultados</h3>
            
            <CategorySelector
              categories={Object.keys(metricsData)}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              metricsData={metricsData}
            />
            
            {selectedCategory && (
              <CategoryMetricsView
                categoryData={metricsData[selectedCategory]}
                categoryName={selectedCategory}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsReport;
