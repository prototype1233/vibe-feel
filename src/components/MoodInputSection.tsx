import React, { useState } from 'react';
import { Sparkles, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { CategoryType } from '../types';

interface MoodInputSectionProps {
  onCurate: (
    thought: string,
    moodVibe: string,
    weather: string,
    categories: CategoryType[]
  ) => void;
  isLoading: boolean;
}

const QUICK_MOODS = [
  { label: '비 내리는 날의 사색', icon: '🌧️' },
  { label: '나른한 일요일의 쉼', icon: '🛋️' },
  { label: '번아웃 뒤의 위로', icon: '🕯️' },
  { label: '새벽 2시의 아련함', icon: '🌙' },
  { label: '벅차오르는 설렘', icon: '✨' },
  { label: '영감이 필요한 몰입', icon: '☕' },
];

const CATEGORY_ITEMS: { id: CategoryType; label: string; icon: string }[] = [
  { id: 'music', label: '음악', icon: '🎵' },
  { id: 'books', label: '책', icon: '📚' },
  { id: 'fashion', label: '옷/스타일', icon: '👗' },
  { id: 'tea', label: '차/음료', icon: '🍵' },
  { id: 'film', label: '영화', icon: '🎬' },
  { id: 'scent', label: '향기', icon: '🕯️' },
];

const SAMPLE_THOUGHTS = [
  "퇴근길 비가 내리는데, 조용히 마음을 가라앉히고 싶어요.",
  "휴일 오후, 아무 생각 없이 나른하게 쉬고 싶은 기분.",
  "한 주 동안 지친 마음에 따뜻한 위로가 필요해요.",
  "새로운 시작을 앞두고 두근두근 설레는 중이에요.",
];

export const MoodInputSection: React.FC<MoodInputSectionProps> = ({
  onCurate,
  isLoading,
}) => {
  const [thought, setThought] = useState('');
  const [selectedMood, setSelectedMood] = useState('비 내리는 날의 사색');
  const [selectedCategories, setSelectedCategories] = useState<CategoryType[]>([
    'music',
    'books',
    'fashion',
    'tea',
  ]);
  const [showDetailSettings, setShowDetailSettings] = useState(false);
  const [weather, setWeather] = useState('rainy');

  const toggleCategory = (catId: CategoryType) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length === 1) return;
      setSelectedCategories(selectedCategories.filter(c => c !== catId));
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCurate(thought, selectedMood, weather, selectedCategories);
  };

  return (
    <section className="bg-white border border-stone-200/90 rounded-2xl p-5 sm:p-7 shadow-xs max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Simple Header */}
        <div className="space-y-1">
          <h2 className="text-xl sm:text-2xl font-serif-kr font-medium text-stone-900">
            오늘 어떤 기분이나 생각을 안고 계신가요?
          </h2>
          <p className="text-xs text-stone-500 font-serif-kr">
            적어주신 감정에 맞춰 음악, 책, 스타일, 티 페어링을 정성껏 골라드립니다.
          </p>
        </div>

        {/* Textarea Input */}
        <div className="relative">
          <textarea
            rows={3}
            value={thought}
            onChange={e => setThought(e.target.value)}
            placeholder="예: 오늘은 유독 일이 많아 지쳤어요. 따뜻한 차 한 잔과 조용한 피아노 음악이 필요해요..."
            className="w-full p-4 rounded-xl border border-stone-200 bg-[#FCFAF7] text-stone-900 placeholder:text-stone-400 font-serif-kr text-sm leading-relaxed focus:outline-none focus:ring-1 focus:ring-stone-400 focus:bg-white transition-all resize-none"
          />
        </div>

        {/* Quick Sample Prompts (Click to fill) */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-stone-500">
          <span className="text-[11px] text-stone-400">추천 예시:</span>
          {SAMPLE_THOUGHTS.map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setThought(item)}
              className="text-stone-600 hover:text-stone-900 hover:bg-stone-100 px-2 py-0.5 rounded transition-colors cursor-pointer text-[11px] truncate max-w-[200px]"
            >
              "{item.substring(0, 18)}..."
            </button>
          ))}
        </div>

        {/* Quick Mood Selection Chips */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <span className="text-xs font-medium text-stone-700 block">무드 선택</span>
          <div className="flex flex-wrap gap-1.5">
            {QUICK_MOODS.map(m => {
              const isSelected = selectedMood === m.label;
              return (
                <button
                  key={m.label}
                  type="button"
                  onClick={() => setSelectedMood(m.label)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-stone-900 text-white border-stone-900 shadow-2xs font-medium'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <span>{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Selection Bar (Clean icon toggle buttons) */}
        <div className="space-y-2 pt-2 border-t border-stone-100">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-stone-700">추천받을 카테고리</span>
            <button
              type="button"
              onClick={() => setSelectedCategories(['music', 'books', 'fashion', 'tea', 'film', 'scent'])}
              className="text-[11px] text-stone-500 hover:text-stone-800 underline cursor-pointer"
            >
              모두 선택
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {CATEGORY_ITEMS.map(cat => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#F6F3EE] text-stone-900 border-stone-400 font-semibold'
                      : 'bg-white text-stone-400 border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {isSelected && <Check className="w-3 h-3 text-stone-700" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsible Weather Option (Clean & uncrowded) */}
        <div>
          <button
            type="button"
            onClick={() => setShowDetailSettings(!showDetailSettings)}
            className="text-[11px] text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer transition-colors"
          >
            {showDetailSettings ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            <span>날씨 직접 설정 (선택)</span>
          </button>

          {showDetailSettings && (
            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                { id: 'rainy', label: '🌧️ 비/눈' },
                { id: 'cloudy', label: '☁️ 흐림' },
                { id: 'sunny', label: '☀️ 맑음' },
                { id: 'dusk', label: '🌇 노을' },
                { id: 'midnight', label: '🌙 새벽' },
              ].map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setWeather(w.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs border cursor-pointer ${
                    weather === w.id
                      ? 'bg-stone-800 text-white border-stone-800'
                      : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Submit Action */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                <span className="font-serif-kr text-xs">큐레이션 캡슐 엮는 중...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span className="font-serif-kr">맞춤 큐레이션 받기</span>
              </>
            )}
          </button>
        </div>

      </form>
    </section>
  );
};
