export type CategoryType = 'music' | 'books' | 'fashion' | 'tea' | 'film' | 'scent';

export interface UserPreferences {
  nickname: string;
  avatar: string;
  bio: string;
  musicGenres: string[];
  bookGenres: string[];
  fashionStyles: string[];
  favoriteScents: string[];
  vibeKeywords: string[];
  onboardingCompleted: boolean;
}

export interface CuratedMusic {
  trackTitle: string;
  artist: string;
  album: string;
  moodReason: string;
  keyLyric: string;
  vibeTag: string;
  tempo: string; // e.g. "72 BPM · 느리고 따뜻한 템포"
  audioFrequency: number; // For procedural ambient player (e.g. 220, 330, 440 Hz base chord)
  externalSearchQuery: string;
}

export interface CuratedBook {
  title: string;
  author: string;
  genre: string;
  coverAccent: string; // CSS gradient or color
  quote: string;
  emotionalReason: string;
  readingMoment: string; // e.g. "취침 전 30분, 따뜻한 캔들 불빛 아래에서"
}

export interface CuratedFashion {
  conceptTitle: string;
  stylingVibe: string;
  colorPalette: { name: string; hex: string }[];
  materials: string[];
  topItem: string;
  bottomItem: string;
  outerOrAccent: string;
  tips: string;
}

export interface CuratedTea {
  blendName: string;
  flavorNotes: string[];
  pairingReason: string;
  brewingGuide: string; // e.g. "90°C 온수에서 3분간 천천히 우려내세요"
}

export interface CuratedFilm {
  title: string;
  director: string;
  year: string;
  atmosphere: string;
  famousLine: string;
  filmReason: string;
}

export interface CuratedScent {
  name: string;
  notes: string; // e.g. "시더우드, 드라이 모스, 쌉싸름한 무화과"
  atmosphere: string;
  diffuseTip: string;
}

export interface MoodColor {
  name: string;
  primaryHex: string;
  secondaryHex: string;
  tailwindBg: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
}

export interface CuratedCapsule {
  id: string;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
    tasteTag: string;
  };
  inputThought: string;
  moodVibe: string;
  weather: string;
  poeticSummary: string;
  emotionalPrescription: string;
  moodColor: MoodColor;
  activeCategories: CategoryType[];
  music?: CuratedMusic;
  book?: CuratedBook;
  fashion?: CuratedFashion;
  tea?: CuratedTea;
  film?: CuratedFilm;
  scent?: CuratedScent;
  isPublic: boolean;
  likes: number;
  likedByMe: boolean;
  savedByMe: boolean;
  comments: CommentItem[];
  tags: string[];
}

export interface TasteFriend {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  sharedTastes: string[];
  matchRate: number; // e.g. 94%
  recentMood: string;
  isFollowing: boolean;
}
