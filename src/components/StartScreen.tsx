interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Decorative doodles */}
      <div className="absolute top-8 left-8 text-4xl opacity-40 animate-[sketchy-line_2s_ease-in-out_infinite]">✏️</div>
      <div className="absolute bottom-12 right-6 text-5xl opacity-30 animate-[sketchy-line_3s_ease-in-out_infinite_0.5s]">🎲</div>
      <div className="absolute top-1/4 right-12 text-3xl opacity-25 animate-pulse">★</div>

      {/* Hero Section - 70-80% viewport */}
      <div className="flex-[7] flex flex-col items-center justify-center text-center px-6 z-10 animate-[doodle-appear_0.6s_ease-out]">
        <h1 
          className="text-8xl md:text-9xl font-bold text-accent mb-3 marker-text" 
          style={{ transform: 'rotate(-2deg)' }}
        >
          Soc Ops
        </h1>
        <p 
          className="text-2xl md:text-3xl text-sketch font-bold max-w-md" 
          style={{ transform: 'rotate(1deg)' }}
        >
          Find people. Tap squares. Win together.
        </p>
      </div>

      {/* Value Proposition Section */}
      <div className="flex-[2] px-6 pb-6 z-10">
        <div className="max-w-4xl mx-auto">
          {/* Benefit Cards - 2x2 grid on mobile, single row on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <div 
              className="doodle-border bg-paper p-3 text-center animate-[fade-in-up_0.5s_ease-out_0.2s_both]"
              style={{ transform: 'rotate(-0.5deg)' }}
            >
              <div className="text-3xl mb-1">👥</div>
              <p className="text-sketch text-sm md:text-base font-bold">Meet People</p>
            </div>
            <div 
              className="doodle-border bg-paper p-3 text-center animate-[fade-in-up_0.5s_ease-out_0.4s_both]"
              style={{ transform: 'rotate(0.5deg)' }}
            >
              <div className="text-3xl mb-1">☑️</div>
              <p className="text-sketch text-sm md:text-base font-bold">Tap Squares</p>
            </div>
            <div 
              className="doodle-border bg-paper p-3 text-center animate-[fade-in-up_0.5s_ease-out_0.6s_both]"
              style={{ transform: 'rotate(-0.3deg)' }}
            >
              <div className="text-3xl mb-1">🎯</div>
              <p className="text-sketch text-sm md:text-base font-bold">Get 5 in Row</p>
            </div>
            <div 
              className="doodle-border bg-paper p-3 text-center animate-[fade-in-up_0.5s_ease-out_0.8s_both]"
              style={{ transform: 'rotate(0.4deg)' }}
            >
              <div className="text-3xl mb-1">🎉</div>
              <p className="text-sketch text-sm md:text-base font-bold">Win Together</p>
            </div>
          </div>

          {/* CTA Button with pulse-glow animation */}
          <button
            onClick={onStart}
            className="w-full bg-accent text-white font-bold py-4 md:py-5 px-8 text-xl md:text-2xl active:bg-accent-light transition-all duration-150 marker-text rough-doodle hover:scale-105 animate-[pulse-glow_2s_ease-in-out_infinite]"
            style={{ transform: 'rotate(0.5deg)' }}
          >
            Start Game →
          </button>
        </div>
      </div>
    </div>
  );
}
