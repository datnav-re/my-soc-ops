/** Domain types for the Bingo game */

export interface BingoSquareData {
  id: number;
  text: string;
  isMarked: boolean;
  isFreeSpace: boolean;
}

export interface BingoLine {
  type: 'row' | 'column' | 'diagonal';
  index: number;
  squares: number[];
}

export type GameState = 'start' | 'playing' | 'bingo';

/** Domain types for Scavenger Hunt mode */

export interface ScavengerItem {
  id: number;
  text: string;
  isChecked: boolean;
}

export type GameMode = 'bingo' | 'scavenger';
