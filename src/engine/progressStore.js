import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useProgressStore = create(
  persist(
    (set) => ({
      phase: 'intro', // intro, wonder, story, simulate, play, reflect
      hearts: 3,
      stars: 0,
      streak: 0,
      xp: 0,
      worldsUnlocked: ['weather'], // First world unlocked by default
      worldResults: {},
      simulateStationsCompleted: [],
      
      setPhase: (phase) => set({ phase }),
      
      answerCorrect: (multiplier) => set((state) => {
        const streak = state.streak + 1;
        const streakMultiplier = streak >= 3 ? 2 : 1;
        return {
          stars: state.stars + 1,
          streak: streak,
          xp: state.xp + (10 * streakMultiplier * multiplier)
        };
      }),
      
      answerWrong: () => set((state) => ({
        hearts: Math.max(0, state.hearts - 1),
        streak: 0
      })),
      
      resetHearts: () => set({ hearts: 3, streak: 0 }),
      
      unlockWorld: (worldId) => set((state) => ({
        worldsUnlocked: state.worldsUnlocked.includes(worldId) 
          ? state.worldsUnlocked 
          : [...state.worldsUnlocked, worldId]
      })),
      
      saveWorldResult: (worldId, correct, total, stars) => set((state) => ({
        worldResults: {
          ...state.worldResults,
          [worldId]: { correct, total, stars }
        }
      })),
      
      markStationCompleted: (stationId) => set((state) => ({
        simulateStationsCompleted: state.simulateStationsCompleted.includes(stationId)
          ? state.simulateStationsCompleted
          : [...state.simulateStationsCompleted, stationId]
      })),
      
      resetProgress: () => set({
        phase: 'intro',
        hearts: 3,
        stars: 0,
        streak: 0,
        xp: 0,
        worldsUnlocked: ['weather'],
        worldResults: {},
        simulateStationsCompleted: []
      }),
      
      playAgain: () => set({
        phase: 'intro'
      })
    }),
    {
      name: 'tableTrackers:v1:progress',
    }
  )
);

export default useProgressStore;
