import { audioMap } from './audioMap';

let currentAudio = null;
let isAudioEnabled = true; // Typically set by user preference, default true

const stopCurrentAudio = () => {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio = null;
  }
};

export const setAudioEnabled = (enabled) => {
  isAudioEnabled = enabled;
  if (!enabled) stopNarration();
};

export const getAudioEnabled = () => isAudioEnabled;

export const playAudio = (text) => {
  return new Promise((resolve) => {
    if (!isAudioEnabled) {
      resolve();
      return;
    }

    stopCurrentAudio();

    const audioUrl = audioMap[text];
    if (audioUrl) {
      currentAudio = new Audio(audioUrl);
      currentAudio.onended = resolve;
      currentAudio.onerror = resolve; // If audio fails, just continue
      currentAudio.play().catch((e) => {
        console.warn('Audio play prevented', e);
        resolve();
      });
    } else {
      console.warn('No audio found in audioMap for text:', text);
      resolve(); // Fallback if no audio found
    }
  });
};

let sequenceId = 0;

// Queue system for multiple lines
export const narrateSequence = async (texts) => {
  if (!isAudioEnabled) return;
  
  const currentId = ++sequenceId;
  for (const text of texts) {
    if (sequenceId !== currentId) break; // sequence was aborted
    await playAudio(text);
  }
};

export const stopNarration = () => {
  sequenceId++; // abort any running sequence
  stopCurrentAudio();
};
