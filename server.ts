import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { generateOfflineCapsule, MOOD_COLORS } from './src/data/curationEngine';
import { CategoryType, UserPreferences } from './src/types';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // Initialize Gemini API if key is present
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = apiKey ? new GoogleGenAI() : null;

  // Health check endpoint
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      hasApiKey: Boolean(apiKey),
      timestamp: new Date().toISOString(),
    });
  });

  // Curate endpoint
  app.post('/api/curate', async (req: Request, res: Response) => {
    const {
      thought = '',
      moodVibe = '',
      weather = 'sunny',
      categories = ['music', 'books', 'fashion', 'tea', 'film', 'scent'],
      preferences = {} as UserPreferences,
    } = req.body;

    const requestedCategories = (Array.isArray(categories) && categories.length > 0
      ? categories
      : ['music', 'books', 'fashion', 'tea', 'film', 'scent']) as CategoryType[];

    // Attempt Gemini call if API key is present
    if (ai) {
      try {
        const prompt = `
당신은 사람의 감정을 직관적으로 읽어내는 감성 큐레이터입니다.
사용자의 기분에 어울리는 음악, 책, 스타일, 티를 추천해주세요.
중요: 장황하고 긴 설명문은 일절 쓰지 마세요. 모든 문장은 짧고 담백하게 1문장 이내로 작성하세요.

[사용자 입력 정보]
- 생각/감정: "${thought}"
- 감정 무드: "${moodVibe}"
- 카테고리: ${requestedCategories.join(', ')}

반드시 다음 JSON 규격으로만 응답하세요. 백틱 없는 순수 JSON입니다.

{
  "poeticSummary": "오늘의 감정을 담은 짧고 아름다운 한 줄 (20자 내외)",
  "emotionalPrescription": "담백한 한 줄 응원",
  "colorName": "새벽 블루 또는 노을 앰버 등",
  "primaryHex": "#HEX",
  "secondaryHex": "#HEX",
  "music": {
    "trackTitle": "곡명",
    "artist": "아티스트",
    "album": "앨범",
    "moodReason": "",
    "keyLyric": "인상 깊은 가사 한 줄",
    "vibeTag": "Acoustic · Jazz 등",
    "tempo": "느린 템포",
    "audioFrequency": 220,
    "externalSearchQuery": "검색어"
  },
  "book": {
    "title": "도서 제목",
    "author": "저자",
    "genre": "장르",
    "quote": "책 속 한 줄 인용문",
    "emotionalReason": "",
    "readingMoment": "밤 11시 침대맡"
  },
  "fashion": {
    "conceptTitle": "스타일 콘셉트명",
    "stylingVibe": "",
    "colorPalette": [
      { "name": "색상1", "hex": "#HEX" },
      { "name": "색상2", "hex": "#HEX" },
      { "name": "색상3", "hex": "#HEX" }
    ],
    "materials": ["소재1", "소재2"],
    "topItem": "상의 아이템",
    "bottomItem": "하의 아이템",
    "outerOrAccent": "포인트 아이템",
    "tips": ""
  },
  "tea": {
    "blendName": "티 명칭",
    "flavorNotes": ["노트1", "노트2"],
    "pairingReason": "",
    "brewingGuide": ""
  },
  "film": {
    "title": "영화 제목",
    "director": "감독",
    "year": "개봉년도",
    "atmosphere": "",
    "famousLine": "명대사 한 줄",
    "filmReason": ""
  },
  "scent": {
    "name": "향수/인센스 명",
    "notes": "주요 향 노트",
    "atmosphere": "",
    "diffuseTip": ""
  },
  "tags": ["키워드1", "키워드2"]
}
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.7,
            responseMimeType: 'application/json',
          },
        });

        const textResponse = response.text || '';
        const parsed = JSON.parse(textResponse);

        const now = new Date();
        const dateStr = now.toLocaleDateString('ko-KR', {
          month: 'long',
          day: 'numeric',
          weekday: 'short',
          hour: '2-digit',
          minute: '2-digit',
        });

        const colorMatch = MOOD_COLORS.find(c => c.name.includes(parsed.colorName)) || {
          name: parsed.colorName || '따스한 감성 톤',
          primaryHex: parsed.primaryHex || '#64748B',
          secondaryHex: parsed.secondaryHex || '#334155',
          tailwindBg: 'from-stone-700 to-stone-900',
        };

        const resultCapsule = {
          id: 'capsule_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
          createdAt: dateStr,
          author: {
            id: 'me',
            name: preferences.nickname || '나의 취향',
            avatar: preferences.avatar || '🌿',
            tasteTag: preferences.vibeKeywords?.[0] || '감성 아키비스트',
          },
          inputThought: thought || '내면의 고요와 마주하는 순간',
          moodVibe: moodVibe || '차분한 사색',
          weather: weather || 'cloudy',
          poeticSummary: parsed.poeticSummary,
          emotionalPrescription: parsed.emotionalPrescription,
          moodColor: colorMatch,
          activeCategories: requestedCategories,
          music: requestedCategories.includes('music') ? parsed.music : undefined,
          book: requestedCategories.includes('books') ? parsed.book : undefined,
          fashion: requestedCategories.includes('fashion') ? parsed.fashion : undefined,
          tea: requestedCategories.includes('tea') ? parsed.tea : undefined,
          film: requestedCategories.includes('film') ? parsed.film : undefined,
          scent: requestedCategories.includes('scent') ? parsed.scent : undefined,
          isPublic: true,
          likes: 0,
          likedByMe: false,
          savedByMe: false,
          comments: [],
          tags: Array.isArray(parsed.tags) ? parsed.tags : [moodVibe, weather],
        };

        return res.json({ success: true, capsule: resultCapsule, source: 'gemini' });
      } catch (geminiError) {
        console.warn('Gemini generation failed, falling back to curated engine:', geminiError);
        // Seamless fallback to our rich archetype engine
      }
    }

    // High quality offline fallback curation
    const offlineCapsule = generateOfflineCapsule(
      thought,
      moodVibe,
      weather,
      requestedCategories,
      preferences
    );

    return res.json({ success: true, capsule: offlineCapsule, source: 'curated-engine' });
  });

  // Daily personalized recommendation
  app.post('/api/personalized-daily', async (req: Request, res: Response) => {
    const preferences: UserPreferences = req.body.preferences || {
      nickname: '취향 여행자',
      avatar: '🌿',
      bio: '',
      musicGenres: ['Indie Folk', 'Jazz'],
      bookGenres: ['감성 에세이'],
      fashionStyles: ['미니멀 놈코어'],
      favoriteScents: ['우디'],
      vibeKeywords: ['따스한', '고즈넉한'],
      onboardingCompleted: true,
    };

    const capsule = generateOfflineCapsule(
      '당신만을 위해 준비된 오늘의 취향 조각들',
      '나른한 일요일의 쉼',
      'sunny',
      ['music', 'books', 'fashion', 'tea', 'scent'],
      preferences
    );

    res.json({ success: true, capsule });
  });

  // Vite middleware in dev or static files in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Sentir Curation Platform server listening on port ${PORT}`);
  });
}

startServer();
