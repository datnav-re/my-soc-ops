import { useState, useEffect } from 'react';

interface StartScreenProps {
  onStart: () => void;
}

interface ValueCard {
  id: number;
  emoji: string;
  title: string;
  description: string;
  detail: string;
  clicks: number;
}

type DoodleAnimation = 'bouncing' | 'spinning' | 'flashing' | '';

export function StartScreen({ onStart }: StartScreenProps) {
  const [cards, setCards] = useState<ValueCard[]>([
    {
      id: 1,
      emoji: '🎯',
      title: 'Break the Ice',
      description: 'Turn awkward silences into fun conversations',
      detail: 'Built-in conversation starters for everyone!',
      clicks: 0,
    },
    {
      id: 2,
      emoji: '🌟',
      title: 'Meet Everyone',
      description: 'Connect with people you might have missed',
      detail: 'Discover shared interests and common ground',
      clicks: 0,
    },
    {
      id: 3,
      emoji: '🎉',
      title: 'Friendly Competition',
      description: 'Add excitement with a dash of friendly rivalry',
      detail: 'First to bingo wins bragging rights!',
      clicks: 0,
    },
    {
      id: 4,
      emoji: '💬',
      title: 'Memorable Moments',
      description: 'Create stories you\'ll talk about later',
      detail: 'Turn networking into an experience',
      clicks: 0,
    },
  ]);

  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [doodleAnimations, setDoodleAnimations] = useState<{
    pencil: DoodleAnimation;
    dice: DoodleAnimation;
    star: DoodleAnimation;
  }>({ pencil: '', dice: '', star: '' });
  const [doodleClicks, setDoodleClicks] = useState({ pencil: 0, dice: 0, star: 0 });
  const [celebratingCards, setCelebratingCards] = useState<Set<number>>(new Set());
  const [playerCount] = useState(() => Math.floor(Math.random() * 50) + 125);
  const [counterPulse, setCounterPulse] = useState(false);

  const totalInteractions = cards.reduce((sum, card) => sum + card.clicks, 0) + 
    doodleClicks.pencil + doodleClicks.dice + doodleClicks.star;
  const maxInteractions = 16; // 4 cards * 2 + 3 doodles * 2 + some buffer
  const progressPercent = Math.min((totalInteractions / maxInteractions) * 100, 100);

  const handleCardClick = (cardId: number) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === cardId ? { ...card, clicks: card.clicks + 1 } : card
      )
    );

    setCelebratingCards((prev) => new Set(prev).add(cardId));
    setTimeout(() => {
      setCelebratingCards((prev) => {
        const next = new Set(prev);
        next.delete(cardId);
        return next;
      });
    }, 600);

    // Toggle expanded state for mobile (only below 640px)
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleDoodleClick = (doodleType: 'pencil' | 'dice' | 'star') => {
    const animations: DoodleAnimation[] = ['bouncing', 'spinning', 'flashing'];
    const randomAnimation = animations[Math.floor(Math.random() * animations.length)];

    setDoodleAnimations((prev) => ({ ...prev, [doodleType]: randomAnimation }));
    setDoodleClicks((prev) => ({ ...prev, [doodleType]: prev[doodleType] + 1 }));

    setTimeout(() => {
      setDoodleAnimations((prev) => ({ ...prev, [doodleType]: '' }));
    }, 800);
  };

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Pulse counter periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCounterPulse(true);
      setTimeout(() => setCounterPulse(false), 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const buttonText = progressPercent >= 50 ? 'You\'re Ready! Start Game →' : 'Start Game →';
  const buttonClass = progressPercent >= 50 
    ? 'w-full bg-accent text-white font-bold py-5 px-8 text-2xl active:bg-accent-light transition-all duration-150 marker-text rough-doodle hover:shadow-lg hover:scale-105 animate-[glow-pulse_2s_ease-in-out_infinite]'
    : 'w-full bg-accent text-white font-bold py-5 px-8 text-2xl active:bg-accent-light transition-all duration-150 marker-text rough-doodle hover:shadow-lg hover:scale-105';

  return (
    <div className="flex flex-col items-center justify-center min-h-full p-4 sm:p-6 relative overflow-hidden">
      {/* Interactive clickable doodles */}
      <div
        className={`absolute top-8 left-8 text-4xl opacity-40 clickable-doodle ${doodleAnimations.pencil}`}
        onClick={() => handleDoodleClick('pencil')}
        onKeyDown={(e) => handleKeyDown(e, () => handleDoodleClick('pencil'))}
        tabIndex={0}
        role="button"
        aria-label="Click the pencil doodle"
      >
        ✏️
      </div>
      <div
        className={`absolute bottom-12 right-6 text-5xl opacity-30 clickable-doodle ${doodleAnimations.dice}`}
        onClick={() => handleDoodleClick('dice')}
        onKeyDown={(e) => handleKeyDown(e, () => handleDoodleClick('dice'))}
        tabIndex={0}
        role="button"
        aria-label="Click the dice doodle"
      >
        🎲
      </div>
      <div
        className={`absolute top-1/4 right-12 text-3xl opacity-25 clickable-doodle ${doodleAnimations.star}`}
        onClick={() => handleDoodleClick('star')}
        onKeyDown={(e) => handleKeyDown(e, () => handleDoodleClick('star'))}
        tabIndex={0}
        role="button"
        aria-label="Click the star doodle"
      >
        ★
      </div>

      <div className="text-center max-w-4xl z-10 w-full">
        {/* Hero section with interactive counter */}
        <div className="mb-8">
          <h1 className="text-5xl sm:text-7xl font-bold text-accent mb-1 marker-text" style={{ transform: 'rotate(-2deg)' }}>
            Soc Ops
          </h1>
          <p className="text-2xl sm:text-3xl text-sketch mb-4 font-bold" style={{ transform: 'rotate(1deg)' }}>
            Social Bingo
          </p>
          <div className={`text-lg sm:text-xl text-sketch font-bold ${counterPulse ? 'animate-[counter-pulse_0.5s_ease-in-out]' : ''}`}>
            🎮 <span className="text-accent">{playerCount}</span> people playing right now!
          </div>
        </div>

        {/* Interactive value proposition cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`value-card doodle-border bg-paper p-4 sm:p-6 ${celebratingCards.has(card.id) ? 'celebrating' : ''}`}
              onClick={() => handleCardClick(card.id)}
              onKeyDown={(e) => handleKeyDown(e, () => handleCardClick(card.id))}
              tabIndex={0}
              role="button"
              aria-label={`${card.title}: ${card.description}`}
              style={{ transform: `rotate(${(card.id % 2 === 0 ? 1 : -1) * 0.5}deg)` }}
            >
              <div className="text-4xl mb-2">{card.emoji}</div>
              <h3 className="text-xl sm:text-2xl font-bold text-sketch mb-2 marker-text">
                {card.title}
              </h3>
              <p className="text-base sm:text-lg text-sketch mb-2">
                {card.description}
              </p>
              {/* Desktop: show on hover, Mobile: show on expand */}
              <div className={`text-sm sm:text-base text-accent font-bold transition-all duration-300 ${
                expandedCard === card.id ? 'opacity-100 max-h-20' : 'sm:opacity-100 sm:max-h-20 opacity-0 max-h-0 overflow-hidden'
              }`}>
                ✨ {card.detail}
              </div>
              {card.clicks > 0 && (
                <div className="text-sm text-sketch mt-2 font-bold">
                  👆 {card.clicks} {card.clicks === 1 ? 'tap' : 'taps'}!
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm sm:text-base text-sketch font-bold">
              Explore to unlock the game
            </span>
            <span className="text-sm sm:text-base text-accent font-bold">
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ transform: `scaleX(${progressPercent / 100})` }}
            />
          </div>
        </div>

        {/* Evolving CTA button */}
        <button
          onClick={onStart}
          className={buttonClass}
          style={{ transform: 'rotate(0.5deg)' }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
