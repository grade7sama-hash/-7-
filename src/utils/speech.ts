/**
 * Web Speech API utilities for Listening and Speaking practice
 */

// Text to Speech (Listening)
export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    onEnd?: () => void;
    onError?: (e: any) => void;
  }
) {
  if (!('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = options?.rate || 0.9; // Slightly slower for language learners
  utterance.pitch = options?.pitch || 1.0;

  // Try to find a good natural English voice
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find(
    (v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('David'))
  ) || voices.find((v) => v.lang.startsWith('en'));

  if (englishVoice) {
    utterance.voice = englishVoice;
  }

  if (options?.onEnd) {
    utterance.onend = options.onEnd;
  }
  if (options?.onError) {
    utterance.onerror = options.onError;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// Calculate speaking similarity percentage between spoken text and target
export function calculateSpeakingScore(spoken: string, target: string): number {
  const cleanSpoken = spoken.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();
  const cleanTarget = target.toLowerCase().replace(/[^a-z0-9 ]/g, '').trim();

  if (!cleanSpoken) return 0;
  if (cleanSpoken === cleanTarget) return 100;

  const targetWords = cleanTarget.split(/\s+/);
  const spokenWords = cleanSpoken.split(/\s+/);

  let matchedWords = 0;
  targetWords.forEach((word) => {
    if (spokenWords.includes(word)) {
      matchedWords++;
    }
  });

  const wordRatio = matchedWords / targetWords.length;

  // Levenshtein distance for close pronunciation
  const lev = levenshteinDistance(cleanSpoken, cleanTarget);
  const maxLen = Math.max(cleanSpoken.length, cleanTarget.length);
  const charRatio = Math.max(0, (maxLen - lev) / maxLen);

  const combinedScore = Math.round((wordRatio * 0.7 + charRatio * 0.3) * 100);
  return Math.min(100, Math.max(0, combinedScore));
}

function levenshteinDistance(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// Speech Recognition (Speaking Practice)
export class SpeechRecognizer {
  private recognition: any = null;
  public isSupported: boolean = false;

  constructor() {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = true;
      this.recognition.lang = 'en-US';
      this.isSupported = true;
    }
  }

  start(
    onResult: (transcript: string, isFinal: boolean) => void,
    onError: (err: any) => void,
    onEnd: () => void
  ) {
    if (!this.recognition) {
      onError(new Error('Speech recognition not supported in this browser.'));
      return;
    }

    try {
      this.recognition.abort();
    } catch (e) {
      // Ignore
    }

    this.recognition.onresult = (event: any) => {
      let interim = '';
      let final = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      onResult(final || interim, Boolean(final));
    };

    this.recognition.onerror = (e: any) => {
      onError(e);
    };

    this.recognition.onend = () => {
      onEnd();
    };

    try {
      this.recognition.start();
    } catch (e) {
      onError(e);
    }
  }

  stop() {
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch (e) {
        // Ignore
      }
    }
  }
}
