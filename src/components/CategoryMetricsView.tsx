
import React from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

interface QuestionItem {
  input: string;
  output: string;
  score: number;
}

interface ClusterItem {
  representative: string;
  questions: string[];
  count: number;
}

interface CategoryMetricsViewProps {
  categoryData: {
    count: number;
    avg_score: number;
    std_score: number;
    scores: number[];
    good_questions: QuestionItem[];
    bad_questions: QuestionItem[];
    best_questions: QuestionItem[];
    worst_questions: QuestionItem[];
    clusters: ClusterItem[];
  };
  categoryName: string;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

const CategoryMetricsView: React.FC<CategoryMetricsViewProps> = ({
  categoryData,
  categoryName,
}) => {
  // Format scores for bar chart
  const scoresDistribution = () => {
    const distribution: { [key: number]: number } = {};
    
    categoryData.scores.forEach((score) => {
      const roundedScore = Math.floor(score);
      distribution[roundedScore] = (distribution[roundedScore] || 0) + 1;
    });
    
    return Object.keys(distribution).map((key) => ({
      score: Number(key),
      count: distribution[Number(key)],
    }));
  };
  
  // Format clusters for pie chart
  const clustersData = categoryData.clusters.map((cluster, index) => ({
    name: cluster.representative.length > 30 
      ? cluster.representative.substring(0, 30) + "..." 
      : cluster.representative,
    value: cluster.count,
    fullName: cluster.representative,
  }));

  return (
    <div className="animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">{categoryName}</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">Total Preguntas</div>
          <div className="text-2xl font-bold">{categoryData.count}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">Puntuación Promedio</div>
          <div className="text-2xl font-bold">{categoryData.avg_score.toFixed(2)}</div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="text-gray-500 text-sm mb-1">Desviación Estándar</div>
          <div className="text-2xl font-bold">{categoryData.std_score.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-medium mb-3">Distribución de Puntuaciones</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={scoresDistribution()} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0A4C95" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h4 className="font-medium mb-3">Clusters de Preguntas</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={clustersData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={false}
                >
                  {clustersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [value, props.payload.fullName]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-3">
            <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
            <h4 className="font-medium">Preguntas con Buen Rendimiento</h4>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {categoryData.good_questions.map((question, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-100 rounded-lg">
                <div className="font-medium mb-1">{question.input}</div>
                <div className="text-sm text-gray-600 mb-2">{question.output}</div>
                <div className="text-xs text-green-700 font-medium">
                  Puntuación: {question.score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center mb-3">
            <ArrowDown className="h-5 w-5 text-red-500 mr-2" />
            <h4 className="font-medium">Preguntas con Bajo Rendimiento</h4>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {categoryData.bad_questions.map((question, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-100 rounded-lg">
                <div className="font-medium mb-1">{question.input}</div>
                <div className="text-sm text-gray-600 mb-2">{question.output}</div>
                <div className="text-xs text-red-700 font-medium">
                  Puntuación: {question.score.toFixed(1)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="font-medium mb-3">Todos los Clusters</h4>
        <div className="space-y-4">
          {categoryData.clusters.map((cluster, index) => (
            <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div className="font-medium mb-2">"{cluster.representative}"</div>
              <div className="text-sm text-gray-500 mb-2">
                {cluster.count} preguntas similares
              </div>
              <div className="space-y-1">
                {cluster.questions.map((question, qIndex) => (
                  <div
                    key={qIndex}
                    className="text-sm p-2 bg-white border border-gray-100 rounded"
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMetricsView;
