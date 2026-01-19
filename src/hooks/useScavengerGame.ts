import { useState, useCallback, useMemo, useEffect } from 'react';
import type { ScavengerItem } from '../types';
import {
  filterScavengerItems,
  createCheckedState,
  toggleIndex,
  getProgress,
  type ScavengerProgress,
} from '../utils/scavengerLogic';
import { questions, FREE_SPACE } from '../data/questions';

export interface ScavengerGameState {
  items: ScavengerItem[];
  progress: ScavengerProgress;
}

export interface ScavengerGameActions {
  toggleItem: (index: number) => void;
  resetGame: () => void;
}

const STORAGE_KEY = 'scavenger-game-state';
const STORAGE_VERSION = 1;

interface StoredScavengerData {
  version: number;
  checkedState: boolean[];
}

function validateStoredData(data: unknown): data is StoredScavengerData {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  const obj = data as Record<string, unknown>;
  
  if (obj.version !== STORAGE_VERSION) {
    return false;
  }
  
  if (!Array.isArray(obj.checkedState)) {
    return false;
  }
  
  const validCheckedState = obj.checkedState.every((item: unknown) => typeof item === 'boolean');
  
  return validCheckedState;
}

function loadScavengerState(): boolean[] | null {
  // SSR guard
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return null;
    }

    const parsed = JSON.parse(saved);
    
    if (validateStoredData(parsed)) {
      return parsed.checkedState;
    } else {
      console.warn('Invalid scavenger state data in localStorage, clearing...');
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Failed to load scavenger state:', error);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  return null;
}

function saveScavengerState(checkedState: boolean[]): void {
  // SSR guard
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const data: StoredScavengerData = {
      version: STORAGE_VERSION,
      checkedState,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Failed to save scavenger state:', error);
  }
}

export function useScavengerGame(): ScavengerGameState & ScavengerGameActions {
  // Filter questions to remove FREE_SPACE
  const scavengerQuestions = useMemo(() => filterScavengerItems(questions, FREE_SPACE), []);

  // Load saved state or create new
  const initialCheckedState = useMemo(() => {
    const loaded = loadScavengerState();
    if (loaded && loaded.length === scavengerQuestions.length) {
      return loaded;
    }
    return createCheckedState(scavengerQuestions.length);
  }, [scavengerQuestions.length]);

  const [checkedState, setCheckedState] = useState<boolean[]>(initialCheckedState);

  // Build items array from questions and checked state
  const items = useMemo<ScavengerItem[]>(() => {
    return scavengerQuestions.map((text, index) => ({
      id: index,
      text,
      isChecked: checkedState[index],
    }));
  }, [scavengerQuestions, checkedState]);

  // Calculate progress
  const progress = useMemo(() => getProgress(checkedState), [checkedState]);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveScavengerState(checkedState);
  }, [checkedState]);

  const toggleItem = useCallback((index: number) => {
    setCheckedState((current) => toggleIndex(current, index));
  }, []);

  const resetGame = useCallback(() => {
    setCheckedState(createCheckedState(scavengerQuestions.length));
  }, [scavengerQuestions.length]);

  return {
    items,
    progress,
    toggleItem,
    resetGame,
  };
}
