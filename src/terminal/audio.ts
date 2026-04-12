// src/terminal/audio.ts

let audioCtx: AudioContext | null = null;
let soundEnabled = false;
const VOLUME = 0.8;
let lastPlayTime = 0;
let lastStructuralPlayTime = 0;
let lastModifierPlayTime = 0;
let lastArrowPlayTime = 0;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

export function toggleSound(): boolean {
  soundEnabled = !soundEnabled;
  if (soundEnabled) {
    initAudioContext();
  }
  return soundEnabled;
}

function playTick(ctx: AudioContext, variation: number) {
  const t = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gainNode = ctx.createGain();

  let freq1 = 1200, freq2 = 2400;
  let type1: OscillatorType = 'sine', type2: OscillatorType = 'triangle';

  switch(variation) {
    case 0: // Interpol Quick Beep
      freq1 = 2800 + Math.random() * 200;
      freq2 = freq1;
      type1 = 'square';
      type2 = 'square';
      break;
    case 1: // Pure Diamond Tap
      freq1 = 1800 + Math.random() * 80;
      freq2 = freq1 * 2.4;
      type1 = 'sine';
      type2 = 'triangle';
      break;
    case 2: // Hollow Crystal Clink
      freq1 = 1400 + Math.random() * 60;
      freq2 = freq1 * 3.1;
      type1 = 'triangle';
      type2 = 'triangle';
      break;
    case 3: // Original Glass (Option 8)
    default:
      freq1 = 1200 + Math.random() * 100;
      freq2 = freq1 * 2.1;
      type1 = 'sine';
      type2 = 'triangle';
      break;
  }

  osc1.type = type1;
  osc1.frequency.setValueAtTime(freq1, t);
  osc2.type = type2;
  osc2.frequency.setValueAtTime(freq2, t);

  // Extremely tight envelope to guarantee absolutely NO overlap
  gainNode.gain.setValueAtTime(0, t);
  
  // Very fast attack without popping (1 millisecond)
  gainNode.gain.linearRampToValueAtTime(VOLUME * 0.6, t + 0.001);
  
  // Fast exponential decay to a mostly inaudible level over 10 milliseconds
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.015);
  
  // Slam it immediately down to exact 0 to make it dead silent before the stop signal
  gainNode.gain.linearRampToValueAtTime(0, t + 0.018);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(ctx.destination);

  osc1.start(t);
  osc2.start(t);
  
  // Hard stop the oscillator directly after silence
  osc1.stop(t + 0.020);
  osc2.stop(t + 0.020);
}

export function playStructuralKeystroke(): void {
  if (!soundEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  const now = performance.now();
  if (now - lastStructuralPlayTime < 35) { // 35ms for structural keys like backspace
    return;
  }
  lastStructuralPlayTime = now;

  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  // "Option 1" style structural down-sweep
  osc.type = 'square';
  osc.frequency.setValueAtTime(2500, t);
  osc.frequency.exponentialRampToValueAtTime(800, t + 0.03);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(VOLUME * 0.7, t + 0.002);
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.035);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.038);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start(t);
  osc.stop(t + 0.040);
}

export function playModifierKeystroke(): void {
  if (!soundEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  const now = performance.now();
  if (now - lastModifierPlayTime < 35) {
    return;
  }
  lastModifierPlayTime = now;

  const t = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gainNode = audioCtx.createGain();
  
  // Option 5: Cybernetic Glass sound
  osc.type = 'square';
  osc.frequency.setValueAtTime(1200 + Math.random() * 100, t);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(6000, t);
  filter.frequency.exponentialRampToValueAtTime(500, t + 0.02);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(VOLUME * 0.7, t + 0.002);
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.035);

  osc.connect(filter);
  filter.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start(t);
  osc.stop(t + 0.038);
}

export function playArrowKeystroke(): void {
  if (!soundEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  const now = performance.now();
  if (now - lastArrowPlayTime < 35) {
    return;
  }
  lastArrowPlayTime = now;

  const t = audioCtx.currentTime;
  const osc1 = audioCtx.createOscillator();
  const osc2 = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  // Option 4: Hollow Crystal Clink
  const freq = 1400 + Math.random() * 60;
  osc1.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, t);
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 3.1, t);

  gainNode.gain.setValueAtTime(0, t);
  gainNode.gain.linearRampToValueAtTime(VOLUME * 0.7, t + 0.001);
  gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
  gainNode.gain.linearRampToValueAtTime(0, t + 0.045);

  osc1.connect(gainNode);
  osc2.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc1.start(t);
  osc2.start(t);
  osc1.stop(t + 0.05);
  osc2.stop(t + 0.05);
}

export function playKeystroke(): void {
  if (!soundEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  // STRICT Rate Limiting: 
  // Guarantee a minimum of 35ms between every playback. 
  // Since our sounds fully die at 20ms, this ensures a dedicated 15ms of pure silence 
  // between the fastest possible inputs, effectively eliminating all "concatenation" or slurring.
  const now = performance.now();
  if (now - lastPlayTime < 60) {
    return;
  }
  lastPlayTime = now;

  // Randomly pick one of the 4 requested sounds (2, 3, 6, 7 equivalents) for mixed variation
  const rand = Math.floor(Math.random() * 4);
  playTick(audioCtx, rand);
}
