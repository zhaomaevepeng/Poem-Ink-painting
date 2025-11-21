import React, { useState, useCallback } from 'react';
import { AppState } from '../types';

interface PoemInputProps {
  onSubmit: (poem: string) => void;
  state: AppState;
}

const SUGGESTED_POEMS = [
  "床前明月光，疑是地上霜。\n举头望明月，低头思故乡。",
  "千山鸟飞绝，万径人踪灭。\n孤舟蓑笠翁，独钓寒江雪。",
  "空山新雨后，天气晚来秋。\n明月松间照，清泉石上流。"
];

export const PoemInput: React.FC<PoemInputProps> = ({ onSubmit, state }) => {
  const [poem, setPoem] = useState("");

  const handleSubmit = useCallback(() => {
    if (poem.trim() && state !== AppState.GENERATING) {
      onSubmit(poem);
    }
  }, [poem, onSubmit, state]);

  const handleSuggestion = (text: string) => {
    setPoem(text);
  };

  return (
    <div className="h-full w-full flex flex-col p-6 md:p-8 bg-white/40 backdrop-blur-md border-l border-stone-200/50 relative">
      
      <div className="mb-4 md:mb-8 flex-shrink-0">
        <h1 className="text-3xl md:text-4xl font-serif-sc font-bold text-stone-800 mb-2 tracking-wide">Ink & Verse</h1>
        <h2 className="text-stone-600 font-serif-sc text-base md:text-lg italic">Where words become strokes.</h2>
      </div>

      <div className="flex-grow flex flex-col space-y-4 md:space-y-6 min-h-0">
        <label htmlFor="poem-input" className="sr-only">Enter your poem</label>
        <div className="relative flex-grow min-h-0">
            <textarea
            id="poem-input"
            className="w-full h-full p-4 md:p-6 bg-white/20 border-none rounded-lg resize-none focus:ring-2 focus:ring-stone-400 focus:outline-none font-serif-sc text-lg md:text-xl leading-relaxed text-stone-800 placeholder-stone-500 shadow-inner transition-all min-h-[120px]"
            placeholder="Enter a Chinese poem here..."
            value={poem}
            onChange={(e) => setPoem(e.target.value)}
            disabled={state === AppState.GENERATING}
            />
             {/* Vertical text decoration on the side of textarea */}
            <div className="absolute right-4 top-6 bottom-6 pointer-events-none opacity-10 writing-vertical font-calligraphy text-2xl text-stone-900 hidden md:block select-none">
                墨韵诗情
            </div>
        </div>

        <div className="space-y-2 flex-shrink-0">
            <p className="text-xs uppercase tracking-wider text-stone-500 font-bold">Classics to try</p>
            <div className="flex flex-wrap gap-2">
                {SUGGESTED_POEMS.map((p, idx) => (
                    <button
                        key={idx}
                        onClick={() => handleSuggestion(p)}
                        disabled={state === AppState.GENERATING}
                        className="px-3 py-1.5 text-xs bg-white/50 hover:bg-white/80 text-stone-600 rounded transition-colors font-serif-sc truncate max-w-[200px] border border-stone-200/30"
                        title={p}
                    >
                        {p.split('，')[0]}...
                    </button>
                ))}
            </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!poem.trim() || state === AppState.GENERATING}
          className={`
            flex-shrink-0 w-full py-3 md:py-4 px-6 rounded-lg font-serif-sc text-lg tracking-[0.2em] transition-all duration-300 shadow-lg
            flex items-center justify-center gap-2
            ${!poem.trim() || state === AppState.GENERATING
              ? 'bg-stone-200/50 text-stone-400 cursor-not-allowed'
              : 'bg-stone-800 text-stone-50 hover:bg-stone-700 hover:shadow-stone-400/50'
            }
          `}
        >
          {state === AppState.GENERATING ? (
            <>
              <span>Grinding Ink</span>
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-75">.</span>
              <span className="animate-bounce delay-150">.</span>
            </>
          ) : (
            <>
              <span>Visualize</span>
              <span className="font-calligraphy text-xl ml-1">挥毫</span>
            </>
          )}
        </button>
      </div>
      
      <div className="mt-4 md:mt-8 pt-2 md:pt-4 border-t border-stone-200/30 text-center text-stone-500 text-xs flex-shrink-0">
        <p>Powered by Google Gemini 2.5 Flash</p>
      </div>
    </div>
  );
};