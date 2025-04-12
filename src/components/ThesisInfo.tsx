
import React from "react";
import { Lightbulb, Zap, Database } from "lucide-react";

const ThesisInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in">
      <div className="bg-fiuba-500 text-white p-4">
        <h2 className="text-xl font-bold">Desarrollo de un Pipeline de Aprendizaje Continuo para Chatbots basados en PLN</h2>
      </div>
      
      <div className="p-6 space-y-6">
        <p className="text-gray-700 leading-relaxed">
          Desarrollamos una herramienta de comunicación automatizada basada en Procesamiento de Lenguaje Natural. 
          Utiliza inteligencia artificial y una arquitectura RAG para responder preguntas frecuentes de forma rápida, 
          precisa y personalizada, ayudando a pequeñas empresas a optimizar su atención al cliente.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-fiuba-100 rounded-full text-fiuba-600">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="font-medium">Inteligencia Artificial</h3>
            </div>
            <p className="text-sm text-gray-600">
              Utilizamos modelos avanzados de IA para comprender y procesar las consultas de los usuarios.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-fiuba-100 rounded-full text-fiuba-600">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="font-medium">Respuestas Rápidas</h3>
            </div>
            <p className="text-sm text-gray-600">
              Optimización del proceso de respuesta para entregar información precisa en tiempo real.
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-fiuba-100 rounded-full text-fiuba-600">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="font-medium">Arquitectura RAG</h3>
            </div>
            <p className="text-sm text-gray-600">
              Retrieval Augmented Generation para combinar conocimiento específico con capacidades generativas.
            </p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-100">
          <h3 className="font-medium text-lg mb-3">Beneficios clave</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-fiuba-500 mr-2">•</span>
              <span className="text-gray-700">Atención al cliente automatizada 24/7</span>
            </li>
            <li className="flex items-start">
              <span className="text-fiuba-500 mr-2">•</span>
              <span className="text-gray-700">Respuestas personalizadas basadas en el contexto de la empresa</span>
            </li>
            <li className="flex items-start">
              <span className="text-fiuba-500 mr-2">•</span>
              <span className="text-gray-700">Mejora continua mediante análisis de métricas y feedback</span>
            </li>
            <li className="flex items-start">
              <span className="text-fiuba-500 mr-2">•</span>
              <span className="text-gray-700">Reducción de costos operativos en servicio al cliente</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThesisInfo;
