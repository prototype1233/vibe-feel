import React from 'react';
import { Sparkles, SlidersHorizontal, RefreshCw } from 'lucide-react';
import { CuratedCapsule, UserPreferences } from '../types';
import { CuratedCapsuleCard } from './CuratedCapsuleCard';

interface PersonalizedForYouProps {
  preferences: UserPreferences;
  onOpenPreferencesModal: () => void;
  dailyCapsule: CuratedCapsule | null;
  onRefreshDailyCapsule: () => void;
  isRefreshing: boolean;
  onLikeToggle: (capsuleId: string) => void;
  onSaveToggle: (capsuleId: string) => void;
  onOpenCardExport: (capsule: CuratedCapsule) => void;
}

export const PersonalizedForYou: React.FC<PersonalizedForYouProps> = ({
  preferences,
  onOpenPreferencesModal,
  dailyCapsule,
  onRefreshDailyCapsule,
  isRefreshing,
  onLikeToggle,
  onSaveToggle,
  onOpenCardExport,
}) => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-kr font-semibold text-stone-900">
            나를 위한 맞춤 추천
          </h2>
          <p className="text-xs text-stone-500 font-serif-kr mt-0.5">
            등록된 취향에 맞춘 오늘의 데일리 감성 페어링입니다.
          </p>
        </div>

        <button
          onClick={onOpenPreferencesModal}
          className="px-3.5 py-1.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>취향 수정</span>
        </button>
      </div>

      {/* Simple Taste Tags Row */}
      <div className="bg-white border border-stone-200/80 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="text-xl">{preferences.avatar || '🌿'}</span>
          <span className="font-semibold text-stone-900">{preferences.nickname}</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-600 font-serif-kr truncate max-w-xs">
            {preferences.musicGenres?.[0]} · {preferences.bookGenres?.[0]} · {preferences.fashionStyles?.[0]}
          </span>
        </div>

        <button
          onClick={onRefreshDailyCapsule}
          disabled={isRefreshing}
          className="text-stone-600 hover:text-stone-900 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="text-[11px]">새로운 추천 받기</span>
        </button>
      </div>

      {/* Daily Curated Capsule for You */}
      {dailyCapsule && (
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>오늘의 맞춤 캡슐</span>
          </div>

          <CuratedCapsuleCard
            capsule={dailyCapsule}
            onLikeToggle={onLikeToggle}
            onSaveToggle={onSaveToggle}
            onOpenCardExport={onOpenCardExport}
          />
        </div>
      )}

    </div>
  );
};
