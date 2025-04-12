
import React, { useState } from "react";
import { Loader2, Check } from "lucide-react";
import { useToast } from "../hooks/use-toast";

const AddContextForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      toast({
        title: "Error",
        description: "Por favor, completa todos los campos.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    setSuccess(false);
    
    try {
      const response = await fetch(
        "https://chatbot-backend.agreeablerock-8abd7837.brazilsouth.azurecontainerapps.io/postcontext/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        }
      );
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      setSuccess(true);
      setTitle("");
      setDescription("");
      
      toast({
        title: "Éxito",
        description: "El contexto se ha agregado correctamente.",
        variant: "default",
      });
      
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error adding context:", error);
      toast({
        title: "Error",
        description: "Ocurrió un error al agregar el contexto. Por favor, intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-fade-in h-full">
      <div className="bg-fiuba-500 text-white p-4">
        <h2 className="text-xl font-bold">Agregar Contexto</h2>
      </div>
      
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ingresa un título descriptivo"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fiuba-500 focus:border-transparent"
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción / Contenido
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Agrega información detallada que el chatbot utilizará para responder preguntas"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-fiuba-500 focus:border-transparent h-48"
              disabled={isSubmitting}
            />
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
              isSubmitting || success
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-fiuba-500 text-white hover:bg-fiuba-600"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Enviando...
              </span>
            ) : success ? (
              <span className="flex items-center justify-center text-green-600">
                <Check className="mr-2 h-5 w-5" />
                Agregado correctamente
              </span>
            ) : (
              "Agregar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContextForm;
