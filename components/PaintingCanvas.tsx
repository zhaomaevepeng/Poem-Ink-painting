import React from 'react';
import { AppState } from '../types';

interface PaintingCanvasProps {
  state: AppState;
  imageUrl: string | null;
}

export const PaintingCanvas: React.FC<PaintingCanvasProps> = ({ state, imageUrl }) => {
  return (
    <div className="h-full w-full flex items-center justify-center p-2 md:p-8 relative overflow-visible">
       
       {/* Ambient shadow for depth */}
       <div className="absolute w-[85%] h-[60%] bg-stone-900/20 blur-[50px] rounded-[50%] pointer-events-none top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

       {/* Main Scroll Container - Flex row to hold Left Roller, Mounting, Right Roller */}
       <div className="relative flex flex-row items-center justify-center w-full max-w-6xl z-10 transition-all duration-700" style={{ aspectRatio: '16/9' }}>
          
          {/* --- LEFT ROLLER --- */}
          <div className="relative h-[108%] w-6 md:w-10 flex-shrink-0 z-20 flex flex-col -mr-[1px] drop-shadow-2xl">
             {/* Top Knob */}
             <div className="h-4 md:h-6 w-full bg-gradient-to-b from-[#3e2b1f] to-[#6d4c35] rounded-t-md border-b border-[#2c1e12]/50"></div>
             {/* Roller Body */}
             <div className="flex-grow w-full bg-gradient-to-r from-[#2c1e12] via-[#8b5e3c] to-[#2c1e12] flex items-center justify-center relative overflow-hidden">
                {/* Wood Grain / Texture */}
                <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_3px,transparent_4px)] mix-blend-overlay"></div>
                {/* Specular Highlight */}
                <div className="absolute left-1/3 w-[1px] h-full bg-white/30 blur-[1px]"></div>
             </div>
             {/* Bottom Knob */}
             <div className="h-4 md:h-6 w-full bg-gradient-to-t from-[#3e2b1f] to-[#6d4c35] rounded-b-md border-t border-[#2c1e12]/50"></div>
          </div>

          {/* --- MIDDLE SILK MOUNTING --- */}
          <div className="relative h-full flex-grow bg-[#E6D5AC] shadow-lg flex items-center justify-center overflow-hidden">
             {/* Silk Pattern Texture */}
             <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#d4c59e_0px,#d4c59e_1px,transparent_1px,transparent_4px)] pointer-events-none"></div>
             <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiNDQ0MiLz4KPC9zdmc+')] mix-blend-multiply pointer-events-none"></div>
             
             {/* Top/Bottom Border Trim (Simulating fabric edge) */}
             <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#cfb98e] z-10"></div>
             <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#cfb98e] z-10"></div>

             {/* --- INNER PAPER AREA --- */}
             <div className="w-[85%] h-[75%] bg-[#fdfbf7] shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] relative overflow-hidden border border-[#dcd3b2]">
                 
                 {/* Paper Grain Texture */}
                 <div className="absolute inset-0 opacity-40 mix-blend-multiply bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBvcGFjaXR5PSIwLjEiPjxmaWx0ZXIgaWQ9Im5vaXNlIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC42NSIgbnVtT2N0YXZlcz0iMyIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] pointer-events-none"></div>

                 {/* Content Handling */}
                 {state === AppState.IDLE && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                        <div className="opacity-30 transform scale-150 mb-4">
                            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                        </div>
                        <p className="font-serif-sc tracking-[0.2em] text-sm md:text-base opacity-60">Waiting for ink...</p>
                    </div>
                 )}

                 {state === AppState.GENERATING && (
                     <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-[#fdfbf7]/80">
                         <div className="w-12 h-12 border-2 border-stone-300 border-t-stone-800 rounded-full animate-spin mb-4"></div>
                         <p className="font-serif-sc text-stone-600 animate-pulse tracking-widest text-sm">Brushing...</p>
                     </div>
                 )}

                 {imageUrl && (
                     <img 
                        src={imageUrl} 
                        alt="Ink Painting" 
                        className={`w-full h-full object-cover mix-blend-multiply transition-opacity duration-1000 ${state === AppState.SUCCESS ? 'opacity-100' : 'opacity-0'}`} 
                     />
                 )}
                 
                 {state === AppState.ERROR && (
                    <div className="absolute inset-0 flex items-center justify-center text-red-900/40 font-serif-sc">
                        <p>Ink Spilled (Error)</p>
                    </div>
                 )}

                 {/* Signature Stamp (Seal) - Only show on success */}
                 {state === AppState.SUCCESS && (
                     <div className="absolute bottom-4 left-4 w-8 h-8 md:w-12 md:h-12 border-2 border-[#b91c1c] opacity-80 rounded-sm flex items-center justify-center mix-blend-multiply rotate-[-5deg] shadow-sm bg-[#b91c1c]/5">
                         <span className="text-[#b91c1c] font-serif text-[10px] md:text-xs leading-tight text-center">AI<br/>Art</span>
                     </div>
                 )}
             </div>
          </div>

          {/* --- RIGHT ROLLER --- */}
          <div className="relative h-[108%] w-6 md:w-10 flex-shrink-0 z-20 flex flex-col -ml-[1px] drop-shadow-2xl">
             {/* Top Knob */}
             <div className="h-4 md:h-6 w-full bg-gradient-to-b from-[#3e2b1f] to-[#6d4c35] rounded-t-md border-b border-[#2c1e12]/50"></div>
             {/* Roller Body */}
             <div className="flex-grow w-full bg-gradient-to-l from-[#2c1e12] via-[#8b5e3c] to-[#2c1e12] flex items-center justify-center relative overflow-hidden">
                {/* Wood Grain */}
                <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#000_3px,transparent_4px)] mix-blend-overlay"></div>
                {/* Highlight */}
                <div className="absolute right-1/3 w-[1px] h-full bg-white/30 blur-[1px]"></div>
             </div>
             {/* Bottom Knob */}
             <div className="h-4 md:h-6 w-full bg-gradient-to-t from-[#3e2b1f] to-[#6d4c35] rounded-b-md border-t border-[#2c1e12]/50"></div>
          </div>

       </div>
    </div>
  );
};
