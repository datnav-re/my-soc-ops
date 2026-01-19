import { useEffect, useRef } from 'react';
import type { GameMode } from '../types';

interface StartScreenProps {
  onStart: (mode: GameMode) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      container.style.setProperty('--scroll-progress', progress.toString());
    };

    container.addEventListener('scroll', handleScroll);
    
    // Set up Intersection Observer for fallback browsers
    if (!CSS.supports('animation-timeline', 'view()')) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
            }
          });
        },
        { threshold: 0.1 }
      );

      const animatedElements = container.querySelectorAll(
        '.scroll-fade-in, .scroll-fade-in-up, .scroll-slide-left, .scroll-slide-right'
      );
      animatedElements.forEach((el) => observer.observe(el));

      return () => {
        observer.disconnect();
        container.removeEventListener('scroll', handleScroll);
      };
    }

    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto overflow-x-hidden relative scroll-smooth"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Floating decorative doodles with parallax */}
      <div className="absolute top-20 left-8 text-4xl opacity-40 animate-[sketchy-line_2s_ease-in-out_infinite] parallax-slow pointer-events-none z-0">✏️</div>
      <div className="absolute top-[40%] right-12 text-5xl opacity-30 animate-[sketchy-line_3s_ease-in-out_infinite_0.5s] parallax-medium pointer-events-none z-0">🎲</div>
      <div className="absolute top-[70%] left-16 text-3xl opacity-25 animate-pulse parallax-fast pointer-events-none z-0">★</div>
      <div className="absolute top-[85%] right-8 text-4xl opacity-35 animate-[sketchy-line_2.5s_ease-in-out_infinite] parallax-slow pointer-events-none z-0">🎉</div>

      {/* Section 1: Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <div className="text-center max-w-3xl animate-[doodle-appear_0.8s_ease-out_forwards]">
          <h1 
            className="text-7xl md:text-9xl font-bold text-accent mb-4 marker-text" 
            style={{ transform: 'rotate(-2deg)' }}
          >
            Soc Ops
          </h1>
          <p 
            className="text-4xl md:text-5xl text-sketch mb-8 font-bold" 
            style={{ transform: 'rotate(1deg)' }}
          >
            Social Bingo
          </p>
          <p className="text-2xl md:text-3xl text-sketch max-w-2xl mx-auto leading-relaxed">
            Turn networking into a game! Break the ice, spark conversations, and make real connections at your next event.
          </p>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-60">
          <div className="text-4xl">↓</div>
          <p className="text-sm text-sketch font-bold">Scroll to explore</p>
        </div>
      </section>

      {/* Section 2: Value Proposition - Benefits */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-accent mb-12 md:mb-16 marker-text text-center scroll-fade-in-up">
          Why Play?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl w-full">
          {/* Benefit Card 1 */}
          <div className="doodle-border bg-paper p-8 scroll-fade-in-up stagger-1" style={{ transform: 'rotate(-0.5deg)' }}>
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-3xl font-bold text-sketch mb-3 marker-text">Meet People</h3>
            <p className="text-xl text-sketch leading-relaxed">
              A fun excuse to approach strangers and start meaningful conversations at any event.
            </p>
          </div>

          {/* Benefit Card 2 */}
          <div className="doodle-border bg-paper p-8 scroll-fade-in-up stagger-2" style={{ transform: 'rotate(0.5deg)' }}>
            <div className="text-6xl mb-4">💬</div>
            <h3 className="text-3xl font-bold text-sketch mb-3 marker-text">Spark Conversations</h3>
            <p className="text-xl text-sketch leading-relaxed">
              Built-in icebreakers that turn awkward small talk into engaging stories and shared experiences.
            </p>
          </div>

          {/* Benefit Card 3 */}
          <div className="doodle-border bg-paper p-8 scroll-fade-in-up stagger-3" style={{ transform: 'rotate(0.5deg)' }}>
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-3xl font-bold text-sketch mb-3 marker-text">Build Connections</h3>
            <p className="text-xl text-sketch leading-relaxed">
              Transform surface-level networking into genuine relationships through playful interaction.
            </p>
          </div>

          {/* Benefit Card 4 */}
          <div className="doodle-border bg-paper p-8 scroll-fade-in-up stagger-4" style={{ transform: 'rotate(-0.5deg)' }}>
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-3xl font-bold text-sketch mb-3 marker-text">Celebrate Wins</h3>
            <p className="text-xl text-sketch leading-relaxed">
              Get a satisfying "BINGO!" moment and bragging rights while making new friends along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <h2 className="text-5xl md:text-6xl font-bold text-accent mb-12 md:mb-16 marker-text text-center scroll-fade-in-up">
          How It Works
        </h2>
        
        <div className="max-w-4xl w-full space-y-8 md:space-y-12">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 scroll-slide-left">
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center text-white text-5xl md:text-6xl font-bold marker-text rough-doodle">
              1
            </div>
            <div className="doodle-border bg-paper p-6 md:p-8 flex-1" style={{ transform: 'rotate(-0.5deg)' }}>
              <h3 className="text-3xl md:text-4xl font-bold text-sketch mb-3 marker-text flex items-center gap-3">
                <span className="text-4xl">🔍</span> Find
              </h3>
              <p className="text-xl md:text-2xl text-sketch leading-relaxed">
                Look at your bingo board and find people who match the questions on your squares.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-6 md:gap-12 scroll-slide-right">
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center text-white text-5xl md:text-6xl font-bold marker-text rough-doodle">
              2
            </div>
            <div className="doodle-border bg-paper p-6 md:p-8 flex-1" style={{ transform: 'rotate(0.5deg)' }}>
              <h3 className="text-3xl md:text-4xl font-bold text-sketch mb-3 marker-text flex items-center gap-3">
                <span className="text-4xl">☑️</span> Tap
              </h3>
              <p className="text-xl md:text-2xl text-sketch leading-relaxed">
                When you find a match, tap the square to mark it. The free space in the center is already yours!
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 scroll-slide-left">
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full bg-accent flex items-center justify-center text-white text-5xl md:text-6xl font-bold marker-text rough-doodle">
              3
            </div>
            <div className="doodle-border bg-paper p-6 md:p-8 flex-1" style={{ transform: 'rotate(-0.5deg)' }}>
              <h3 className="text-3xl md:text-4xl font-bold text-sketch mb-3 marker-text flex items-center gap-3">
                <span className="text-4xl">🎉</span> Win
              </h3>
              <p className="text-xl md:text-2xl text-sketch leading-relaxed">
                Get 5 squares in a row (horizontal, vertical, or diagonal) and celebrate your BINGO victory!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: CTA */}
      <section className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 relative z-10">
        <div className="text-center max-w-3xl scroll-fade-in-up">
          <h2 className="text-5xl md:text-7xl font-bold text-accent mb-8 marker-text" style={{ transform: 'rotate(-1deg)' }}>
            Ready to Play?
          </h2>
          <p className="text-2xl md:text-3xl text-sketch mb-12 leading-relaxed">
            Choose your game mode and start making connections!
          </p>
          
          {/* Game mode buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Bingo Mode */}
            <div className="doodle-border bg-paper p-6" style={{ transform: 'rotate(-0.5deg)' }}>
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-sketch mb-3 marker-text">Bingo Mode</h3>
              <p className="text-lg text-sketch mb-6 leading-relaxed">
                Classic 5×5 grid. Find matches, mark squares, get 5 in a row to win!
              </p>
              <button
                onClick={() => onStart('bingo')}
                className="w-full bg-accent text-white font-bold py-4 px-8 text-2xl active:bg-accent-light transition-all duration-150 marker-text rough-doodle hover:shadow-lg hover:scale-105"
                style={{ transform: 'rotate(0.5deg)' }}
              >
                Play Bingo →
              </button>
            </div>

            {/* Scavenger Hunt Mode */}
            <div className="doodle-border bg-paper p-6" style={{ transform: 'rotate(0.5deg)' }}>
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-3xl font-bold text-sketch mb-3 marker-text">Scavenger Hunt</h3>
              <p className="text-lg text-sketch mb-6 leading-relaxed">
                Check off items from a list. Track your progress and complete them all!
              </p>
              <button
                onClick={() => onStart('scavenger')}
                className="w-full bg-accent text-white font-bold py-4 px-8 text-2xl active:bg-accent-light transition-all duration-150 marker-text rough-doodle hover:shadow-lg hover:scale-105"
                style={{ transform: 'rotate(-0.5deg)' }}
              >
                Start Hunt →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
