
import React from "react";

interface CategorySelectorProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  metricsData: {
    [category: string]: {
      count: number;
      avg_score: number;
    };
  };
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  metricsData,
}) => {
  // Function to determine background color based on average score
  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-green-100 border-green-200 text-green-800";
    if (score >= 6) return "bg-yellow-100 border-yellow-200 text-yellow-800";
    return "bg-red-100 border-red-200 text-red-800";
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Categorías</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {categories.map((category) => {
          const data = metricsData[category];
          const scoreColor = getScoreColor(data.avg_score);
          
          return (
            <div
              key={category}
              onClick={() => onSelectCategory(category)}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                selectedCategory === category
                  ? "border-fiuba-500 ring-2 ring-fiuba-100"
                  : "border-gray-200"
              }`}
            >
              <div className="font-medium mb-2">{category}</div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{data.count} preguntas</span>
                <span className={`px-2 py-1 rounded-full text-xs ${scoreColor}`}>
                  {data.avg_score.toFixed(1)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
