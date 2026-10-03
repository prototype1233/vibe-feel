import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import { UserPreferences } from '../types';

interface TastePreferenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (updated: UserPreferences) => void;
}

const AVATAR_OPTIONS = ['🌿', '🌧️', '☕', '📖', '🎷', '🌙', '🕯️', '🌌', '🍂', '✨'];

const MUSIC_GENRE_OPTIONS = [
  'Indie Folk (인디 포크)',
  'Lo-Fi Jazz (로파이 재즈)',
  'Neo-Classical (네오 클래시컬)',
  'Acoustic Piano (피아노 연주곡)',
  'Korean R&B / Soul',
  'City Pop (시티팝)',
  'Ambient / Drone (앰비언트)',
  'Indie Pop (인디 팝)',
];

const BOOK_GENRE_OPTIONS = [
  '감성 에세이 / 산문',
  '한국 현대 소설',
  '서정시 / 시집',
  '철학 / 인문 고전',
  '공간 & 예술 비평',
  '심리 & 마음 치유',
];

const FASHION_STYLE_OPTIONS = [
  '미니멀 놈코어 (Minimal)',
  '프렌치 시크 (French Chic)',
  '내추럴 코지 캐주얼 (Natural Cozy)',
  '빈티지 아메카지 (Vintage Workwear)',
  '콰이어트 럭셔리 (Quiet Luxury)',
  '모던 다크 실루엣 (Modern Dark)',
];

const SCENT_OPTIONS = [
  '우디 & 시더우드 (Woody)',
  '비에 젖은 흙내음 (Petrichor)',
  '고즈넉한 인센스 (Incense)',
  '베르가못 & 시트러스 (Citrus)',
  '포근한 린넨 & 코튼 (Linen)',
  '달콤 쌉싸름한 무화과 (Fig)',
];

export const TastePreferenceModal: React.FC<TastePreferenceModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  const [nickname, setNickname] = useState(preferences.nickname || '나의 취향');
  const [avatar, setAvatar] = useState(preferences.avatar || '🌿');
  const [bio, setBio] = useState(preferences.bio || '');
  const [musicGenres, setMusicGenres] = useState<string[]>(preferences.musicGenres || ['Indie Folk (인디 포크)', 'Lo-Fi Jazz (로파이 재즈)']);
  const [bookGenres, setBookGenres] = useState<string[]>(preferences.bookGenres || ['감성 에세이 / 산문']);
  const [fashionStyles, setFashionStyles] = useState<string[]>(preferences.fashionStyles || ['미니멀 놈코어 (Minimal)']);
  const [favoriteScents, setFavoriteScents] = useState<string[]>(preferences.favoriteScents || ['우디 & 시더우드 (Woody)']);

  if (!isOpen) return null;

  const toggleItem = (list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    if (list.includes(item)) {
      if (list.length > 1) {
        setList(list.filter(i => i !== item));
      }
    } else {
      setList([...list, item]);
    }
  };

  const handleSave = () => {
    onSavePreferences({
      nickname,
      avatar,
      bio,
      musicGenres,
      bookGenres,
      fashionStyles,
      favoriteScents,
      vibeKeywords: [
        musicGenres[0]?.split(' ')[0] || '감성',
        fashionStyles[0]?.split(' ')[0] || '미니멀',
      ],
      onboardingCompleted: true,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-stone-200/80 p-6 flex items-center justify-between z-10">
          <div>
            <span className="text-xs font-sans tracking-widest text-stone-400 uppercase">
              Taste Calibration
            </span>
            <h3 className="font-editorial text-2xl text-stone-900 font-normal">
              나만의 취향 DNA 설정
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Profile Basic Info */}
          <div className="space-y-4">
            <label className="text-xs font-bold font-sans text-stone-800 block uppercase tracking-wider">
              프로필 정보
            </label>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-stone-500 font-sans mr-2">심볼 이모지:</span>
              {AVATAR_OPTIONS.map(emo => (
                <button
                  key={emo}
                  type="button"
                  onClick={() => setAvatar(emo)}
                  className={`w-9 h-9 rounded-full text-lg flex items-center justify-center border transition-all cursor-pointer ${
                    avatar === emo ? 'bg-white border-stone-900 shadow-xs scale-110' : 'bg-stone-100 border-stone-200 hover:bg-white'
                  }`}
                >
                  {emo}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-stone-600 font-sans block mb-1">취향 닉네임</label>
                <input
                  type="text"
                  value={nickname}
                  onChange={e => setNickname(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-serif-kr text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  placeholder="예: 비 내리는 서교동"
                />
              </div>

              <div>
                <label className="text-xs text-stone-600 font-sans block mb-1">한 줄 취향 소개</label>
                <input
                  type="text"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-200 bg-white text-xs font-serif-kr text-stone-900 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  placeholder="예: 느린 피아노 선율과 종이책의 냄새를 좋아합니다."
                />
              </div>
            </div>
          </div>

          {/* Music Preferences */}
          <div className="space-y-3 pt-4 border-t border-stone-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold font-sans text-stone-800 uppercase tracking-wider">
                좋아하는 음악 장르 (다중 선택)
              </label>
              <span className="text-[11px] text-stone-400 font-sans">
                {musicGenres.length}개 선택됨
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {MUSIC_GENRE_OPTIONS.map(genre => {
                const isSelected = musicGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => toggleItem(musicGenres, setMusicGenres, genre)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Book Preferences */}
          <div className="space-y-3 pt-4 border-t border-stone-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold font-sans text-stone-800 uppercase tracking-wider">
                선호하는 도서 & 문학 장르
              </label>
              <span className="text-[11px] text-stone-400 font-sans">
                {bookGenres.length}개 선택됨
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {BOOK_GENRE_OPTIONS.map(bGenre => {
                const isSelected = bookGenres.includes(bGenre);
                return (
                  <button
                    key={bGenre}
                    type="button"
                    onClick={() => toggleItem(bookGenres, setBookGenres, bGenre)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{bGenre}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fashion Preferences */}
          <div className="space-y-3 pt-4 border-t border-stone-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold font-sans text-stone-800 uppercase tracking-wider">
                패션 & 스타일링 무드
              </label>
              <span className="text-[11px] text-stone-400 font-sans">
                {fashionStyles.length}개 선택됨
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {FASHION_STYLE_OPTIONS.map(fStyle => {
                const isSelected = fashionStyles.includes(fStyle);
                return (
                  <button
                    key={fStyle}
                    type="button"
                    onClick={() => toggleItem(fashionStyles, setFashionStyles, fStyle)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{fStyle}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Scent Preferences */}
          <div className="space-y-3 pt-4 border-t border-stone-200/70">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold font-sans text-stone-800 uppercase tracking-wider">
                마음을 차분하게 하는 향기 & 공간
              </label>
              <span className="text-[11px] text-stone-400 font-sans">
                {favoriteScents.length}개 선택됨
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SCENT_OPTIONS.map(scent => {
                const isSelected = favoriteScents.includes(scent);
                return (
                  <button
                    key={scent}
                    type="button"
                    onClick={() => toggleItem(favoriteScents, setFavoriteScents, scent)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{scent}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-[#FAF8F5]/95 backdrop-blur-xs border-t border-stone-200/80 p-5 px-6 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-serif-kr">
            설정된 취향은 모든 AI 큐레이션 및 추천 캡슐에 자동 반영됩니다.
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>취향 프로필 저장하기</span>
          </button>
        </div>

      </div>
    </div>
  );
};
