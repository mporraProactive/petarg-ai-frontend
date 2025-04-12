
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, FileText } from "lucide-react";

const Navigation = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 md:top-0 md:h-full md:w-16 md:border-r md:border-t-0 z-10">
      <div className="flex justify-around py-2 md:flex-col md:justify-start md:py-6 md:space-y-8 md:items-center">
        <div className="md:mb-6 flex justify-center">
          <div className="hidden md:block w-10 h-10 rounded-full bg-fiuba-500 text-white flex items-center justify-center font-bold animate-pulse-light">
            AI
          </div>
        </div>
        
        <Link 
          to="/" 
          className={`navigation-link flex flex-col items-center ${isActive('/') ? 'active' : ''}`}
        >
          <Home size={20} />
          <span className="text-xs mt-1">Home</span>
        </Link>
        
        <Link 
          to="/metricas" 
          className={`navigation-link flex flex-col items-center ${isActive('/metricas') ? 'active' : ''}`}
        >
          <BarChart2 size={20} />
          <span className="text-xs mt-1">Métricas</span>
        </Link>
        
        <Link 
          to="/contexto" 
          className={`navigation-link flex flex-col items-center ${isActive('/contexto') ? 'active' : ''}`}
        >
          <FileText size={20} />
          <span className="text-xs mt-1">Contexto</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
