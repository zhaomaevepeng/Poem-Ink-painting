import React, { useState } from 'react';
import { PaintingCanvas } from './components/PaintingCanvas';
import { PoemInput } from './components/PoemInput';
import { generateInkPainting } from './services/geminiService';
import { AppState } from './types';

export default function App() {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [currentPoem, setCurrentPoem] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePoemSubmit = async (poem: string) => {
    if (!poem) return;
    
    // Reset state for new generation
    setState(AppState.GENERATING);
    setCurrentPoem(poem);
    setError(null);
    
    try {
      const generatedImageUrl = await generateInkPainting(poem);
      setImageUrl(generatedImageUrl);
      setState(AppState.SUCCESS);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
      setState(AppState.ERROR);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-stone-100/20 font-sans selection:bg-stone-300 overflow-hidden">
      
      <main className="w-full max-w-[1600px] h-full max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-200/50 backdrop-blur-sm bg-white/5">
        
        {/* Left Side: Painting Display */}
        <div className="w-full md:w-2/3 h-1/2 md:h-full bg-paper-white border-b md:border-b-0 md:border-r border-stone-200 relative">
          <PaintingCanvas 
            state={state} 
            imageUrl={imageUrl} 
          />
        </div>

        {/* Right Side: Input Area */}
        <div className="w-full md:w-1/3 h-1/2 md:h-full">
          <PoemInput 
            onSubmit={handlePoemSubmit}
            state={state}
          />
        </div>
        
      </main>

      {/* Global Error Toast */}
      {error && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-red-50 border border-red-200 text-red-800 px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce z-50">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
          <span className="text-sm font-medium">{error}</span>
          <button onClick={() => setError(null)} className="ml-2 text-red-500 hover:text-red-700">
             &times;
          </button>
        </div>
      )}
    </div>
  );
}