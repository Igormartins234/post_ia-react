'use client';

import { useState } from 'react';
import ContentDisplay from './ContentDisplay';
import SkeletonLoader from './SkeletonLoader';


interface SocialContent {
  twitter: string;
  instagram: string;
  linkedin: string;
}

const ContentGeneratorForm = () => {
  
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Profissional');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedContent, setGeneratedContent] = useState<SocialContent | null>(null);


  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ topic, audience, tone }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ocorreu um erro ao gerar o conteúdo.');
      } 
      
      setGeneratedContent(data);

    } catch (err: unknown) { // Mude de 'any' para 'unknown'
    let errorMessage = 'Ocorreu um erro inesperado ao conectar com a API.';
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    }
    setError(errorMessage);
  } finally {
    setIsLoading(false);
  }
  }
  return (
    <div className="mt-10 w-full">

      <form onSubmit={handleSubmit} className="bg-white/60 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 space-y-6 transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label htmlFor="topic" className="block text-sm font-semibold text-slate-700 mb-1">
              Tópico / Produto
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-xl border-slate-300 bg-white/80 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition"
              placeholder="Ex: Lançamento de um novo café gourmet orgânico"
              required
            />
          </div>

          <div>
            <label htmlFor="audience" className="block text-sm font-semibold text-slate-700 mb-1">
              Público-alvo
            </label>
            <input
              type="text"
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="mt-1 block w-full rounded-xl border-slate-300 bg-white/80 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition"
              placeholder="Ex: Amantes de café e sustentabilidade"
              required
            />
          </div>
          
          <div>
            <label htmlFor="tone" className="block text-sm font-semibold text-slate-700 mb-1">
              Tom da Comunicação
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="mt-1 block w-full rounded-xl border-slate-300 bg-white/80 shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 sm:text-sm transition"
            >
              <option>Profissional</option>
              <option>Amigável</option>
              <option>Engraçado</option>
              <option>Inspirador</option>
              <option>Urgente</option>
              <option>Luxuoso</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !topic || !audience}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-all duration-300 ease-in-out transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? 'Gerando...' : 'Gerar Conteúdo'}
        </button>
      </form>

      {/* Lógica de exibição com Skeleton Loader */}
      {isLoading && <SkeletonLoader />}
      
      {error && (
        <div className="mt-8 text-center bg-red-100 border border-red-300 text-red-800 p-4 rounded-xl">
          <p><strong>Oops!</strong> {error}</p>
        </div>
      )}
      
      {generatedContent && !isLoading && <ContentDisplay content={generatedContent} />}
    </div>
  );
};

export default ContentGeneratorForm;