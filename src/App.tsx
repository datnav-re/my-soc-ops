import { useState, useCallback } from 'react';
import { useBingoGame } from './hooks/useBingoGame';
import { useScavengerGame } from './hooks/useScavengerGame';
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { ScavengerScreen } from './components/ScavengerScreen';
import { BingoModal } from './components/BingoModal';
import type { GameMode } from './types';

function App() {
  const [currentMode, setCurrentMode] = useState<GameMode | null>(null);

  const {
    gameState,
    board,
    winningSquareIds,
    showBingoModal,
    startGame: startBingoGame,
    handleSquareClick,
    resetGame: resetBingoGame,
    dismissModal,
  } = useBingoGame();

  const {
    items,
    progress,
    toggleItem,
    resetGame: resetScavengerGame,
  } = useScavengerGame();

  const handleStart = useCallback((mode: GameMode) => {
    setCurrentMode(mode);
    if (mode === 'bingo') {
      startBingoGame();
    }
    // Scavenger mode doesn't need explicit start, it uses existing state
  }, [startBingoGame]);

  const handleReset = useCallback(() => {
    setCurrentMode(null);
    if (currentMode === 'bingo') {
      resetBingoGame();
    } else if (currentMode === 'scavenger') {
      resetScavengerGame();
    }
  }, [currentMode, resetBingoGame, resetScavengerGame]);

  // Show start screen if no mode selected or in bingo start state
  if (currentMode === null || (currentMode === 'bingo' && gameState === 'start')) {
    return <StartScreen onStart={handleStart} />;
  }

  // Show bingo game screen
  if (currentMode === 'bingo') {
    return (
      <>
        <GameScreen
          board={board}
          winningSquareIds={winningSquareIds}
          hasBingo={gameState === 'bingo'}
          onSquareClick={handleSquareClick}
          onReset={handleReset}
        />
        {showBingoModal && (
          <BingoModal onDismiss={dismissModal} />
        )}
      </>
    );
  }

  // Show scavenger hunt screen
  if (currentMode === 'scavenger') {
    return (
      <ScavengerScreen
        items={items}
        progress={progress}
        onToggleItem={toggleItem}
        onReset={handleReset}
      />
    );
  }

  return null;
}

export default App;
