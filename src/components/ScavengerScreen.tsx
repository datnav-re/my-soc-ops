import type { ScavengerItem } from '../types';
import type { ScavengerProgress } from '../utils/scavengerLogic';

interface ScavengerScreenProps {
  items: ScavengerItem[];
  progress: ScavengerProgress;
  onToggleItem: (index: number) => void;
  onReset: () => void;
}

export function ScavengerScreen({
  items,
  progress,
  onToggleItem,
  onReset,
}: ScavengerScreenProps) {
  return (
    <div className="flex flex-col min-h-full bg-paper">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-paper border-b-4 border-dashed border-sketch relative">
        <button
          onClick={onReset}
          className="text-sketch text-lg font-bold px-4 py-2 rough-doodle bg-paper active:scale-95 transition-transform marker-text"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-accent marker-text" style={{ transform: 'rotate(-1deg)' }}>
          Scavenger Hunt
        </h1>
        <div className="w-20"></div>
      </header>

      {/* Progress Bar */}
      <div className="p-4 bg-paper">
        <div className="doodle-border bg-white p-4" style={{ transform: 'rotate(0.5deg)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sketch font-bold marker-text text-xl">Progress</span>
            <span className="text-accent font-bold marker-text text-2xl">
              {progress.count} / {progress.total}
            </span>
          </div>
          
          {/* Progress bar container */}
          <div className="relative h-8 bg-white rounded-lg overflow-hidden" 
            style={{ 
              border: '3px dashed var(--color-sketch)',
              borderRadius: '12px 6px 14px 8px'
            }}>
            {/* Progress fill */}
            <div
              className="absolute left-0 top-0 h-full transition-all duration-300 ease-out"
              style={{
                width: `${progress.percent}%`,
                background: progress.done 
                  ? 'var(--color-bingo)' 
                  : 'linear-gradient(90deg, var(--color-marked) 0%, var(--color-marked-alt) 100%)',
              }}
            />
            {/* Percentage text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sketch font-bold marker-text text-lg relative z-10">
                {progress.percent}%
              </span>
            </div>
          </div>

          {/* Completion message */}
          {progress.done && (
            <div className="mt-3 text-center animate-[doodle-appear_0.5s_ease-out]">
              <span className="text-bingo font-bold marker-text text-2xl">
                🎉 All Done! Great job! 🎉
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <p className="text-center text-sketch text-lg py-3 px-4 font-bold marker-text" style={{ transform: 'skewY(-0.5deg)' }}>
        Check off each item as you find someone who matches! ✨
      </p>

      {/* Scavenger List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-2xl mx-auto space-y-3">
          {items.map((item, index) => (
            <label
              key={item.id}
              className="flex items-start gap-4 p-4 bg-paper doodle-border cursor-pointer active:scale-98 transition-transform"
              style={{ 
                transform: `rotate(${index % 2 === 0 ? '-0.5' : '0.5'}deg)`,
                opacity: item.isChecked ? 0.7 : 1,
              }}
            >
              {/* Custom checkbox */}
              <div className="flex-shrink-0 relative pt-1">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => onToggleItem(index)}
                  className="sr-only"
                />
                <div
                  className="w-8 h-8 rounded transition-all"
                  style={{
                    border: '3px solid var(--color-sketch)',
                    borderRadius: '6px 8px 6px 8px',
                    background: item.isChecked 
                      ? 'var(--color-marked)' 
                      : 'white',
                    transform: `rotate(${item.isChecked ? '5deg' : '0deg'})`,
                  }}
                >
                  {item.isChecked && (
                    <svg
                      className="w-full h-full p-1 animate-[doodle-appear_0.2s_ease-out]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-sketch)"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Item text */}
              <span
                className={`flex-1 text-xl marker-text ${
                  item.isChecked ? 'line-through text-sketch/50' : 'text-sketch'
                }`}
              >
                {item.text}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
