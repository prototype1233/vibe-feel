// Reliable Musical Audio & Ambient Engine
class MusicPreviewEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private sequenceTimer: number | null = null;
  private gainNode: GainNode | null = null;

  // Curated public domain / creative commons audio stream snippets
  private curatedStreams: Record<string, string> = {
    gymnopedie: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Erik_Satie_-_Gymnopedie_No._1.ogg',
    clair_de_lune: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Clair_de_lune_%28Claude_Debussy%29_Suite_bergamasque.ogg',
    chopin_nocturne: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Frederic_Chopin_-_Nocturne_in_E_Flat_Major%2C_Op._9%2C_No._2.ogg',
    bach_aria: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Bach_Goldberg_Variations_01_Aria.ogg',
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play realistic music preview
  public async playTrackPreview(trackTitle?: string, mood?: string): Promise<boolean> {
    this.stop();
    this.initContext();

    // Pick stream according to vibe
    let streamUrl = this.curatedStreams.gymnopedie;
    const title = (trackTitle || '').toLowerCase();
    const moodStr = (mood || '').toLowerCase();

    if (moodStr.includes('새벽') || title.includes('midnight') || title.includes('달')) {
      streamUrl = this.curatedStreams.clair_de_lune;
    } else if (moodStr.includes('설렘') || moodStr.includes('시작') || moodStr.includes('따뜻')) {
      streamUrl = this.curatedStreams.bach_aria;
    } else if (moodStr.includes('위로') || moodStr.includes('쉼') || moodStr.includes('숨')) {
      streamUrl = this.curatedStreams.chopin_nocturne;
    }

    try {
      // 1. First attempt: Stream audio with HTML5 Audio element
      const audio = new Audio(streamUrl);
      audio.crossOrigin = 'anonymous';
      audio.volume = 0.75;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.currentAudioElement = audio;
        this.isPlaying = true;

        audio.onended = () => {
          this.isPlaying = false;
        };

        return true;
      }
    } catch {
      // If streaming is blocked by network or CORS, seamlessly fall back to our procedural piano arpeggiator!
    }

    // 2. Fallback: Procedural Relaxing Piano & Rhodes Chord Arpeggiator (100% reliable, zero network dependency)
    this.playProceduralPianoChords();
    return true;
  }

  // Plays a lush Lo-Fi / Acoustic Piano progression (Cmaj7 -> Am9 -> Fmaj7 -> G11)
  private playProceduralPianoChords() {
    if (!this.ctx) return;
    this.isPlaying = true;

    // Chord note frequencies (Hz)
    const chords = [
      // Cmaj9
      [130.81, 261.63, 329.63, 392.00, 493.88, 587.33],
      // Am9
      [110.00, 220.00, 261.63, 329.63, 392.00, 493.88],
      // Fmaj7#11
      [87.31, 174.61, 261.63, 329.63, 369.99, 440.00],
      // Gsus4 -> G7
      [98.00, 196.00, 293.66, 392.00, 440.00, 523.25],
    ];

    let chordIdx = 0;
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isPlaying || !this.ctx) return;

      const currentChord = chords[chordIdx];
      const freq = currentChord[noteIdx];

      this.triggerPianoNote(freq, noteIdx === 0 ? 0.35 : 0.22);

      noteIdx++;
      if (noteIdx >= currentChord.length) {
        noteIdx = 0;
        chordIdx = (chordIdx + 1) % chords.length;
      }

      // Schedule next note in arpeggio
      const delay = noteIdx === 0 ? 900 : 380;
      this.sequenceTimer = window.setTimeout(playNextNote, delay);
    };

    playNextNote();
  }

  // Synthesizes a warm acoustic piano / electric piano bell strike with natural decay
  private triggerPianoNote(freq: number, volume: number = 0.25) {
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const oscHarmonic = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Main tone (sine/triangle blend)
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Harmonic overtone (rich acoustic resonance)
      oscHarmonic.type = 'sine';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now);

      // Warm low-pass filter
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(300, now + 1.8);

      // Acoustic Piano Envelope (Immediate attack, gentle exponential decay)
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(volume, now + 0.02);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      osc.connect(filter);
      oscHarmonic.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);

      osc.stop(now + 2.3);
      oscHarmonic.stop(now + 2.3);
    } catch {
      // Ignore
    }
  }

  public stop() {
    this.isPlaying = false;

    if (this.sequenceTimer) {
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    }

    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {
        // Ignore
      }
      this.currentAudioElement = null;
    }

    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch {
        // Ignore
      }
      this.gainNode = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const musicPlayer = new MusicPreviewEngine();
// Alias for backward compatibility
export const ambientSound = {
  playMoodAmbient: (freq?: number, type?: string, vol?: number) => {
    return musicPlayer.playTrackPreview('Ambient Sound', type);
  },
  stop: () => musicPlayer.stop(),
  setVolume: (_v: number) => {},
  getStatus: () => musicPlayer.getIsPlaying(),
};
