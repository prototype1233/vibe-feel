import React, { useState } from 'react';
import { Search, PlusCircle, UserPlus, UserCheck } from 'lucide-react';
import { CuratedCapsule, TasteFriend } from '../types';
import { CuratedCapsuleCard } from './CuratedCapsuleCard';

interface CommunityLoungeProps {
  capsules: CuratedCapsule[];
  tasteFriends: TasteFriend[];
  onToggleFollowFriend: (friendId: string) => void;
  onLikeToggle: (capsuleId: string) => void;
  onSaveToggle: (capsuleId: string) => void;
  onAddComment: (capsuleId: string, text: string) => void;
  onOpenCardExport: (capsule: CuratedCapsule) => void;
  onNavigateToCurate: () => void;
}

export const CommunityLounge: React.FC<CommunityLoungeProps> = ({
  capsules,
  tasteFriends,
  onToggleFollowFriend,
  onLikeToggle,
  onSaveToggle,
  onAddComment,
  onOpenCardExport,
  onNavigateToCurate,
}) => {
  const [filter, setFilter] = useState<'all' | 'recent' | 'popular'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCapsules = capsules.filter(cap => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inSummary = cap.poeticSummary.toLowerCase().includes(q);
      const inThought = cap.inputThought?.toLowerCase().includes(q);
      const inMusic = cap.music?.trackTitle.toLowerCase().includes(q) || cap.music?.artist.toLowerCase().includes(q);
      const inBook = cap.book?.title.toLowerCase().includes(q) || cap.book?.author.toLowerCase().includes(q);
      if (!inSummary && !inThought && !inMusic && !inBook) return false;
    }

    if (filter === 'popular') {
      return (cap.likes || 0) >= 30;
    }

    return true;
  });

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Simple Header */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-kr font-semibold text-stone-900">
            취향 살롱
          </h2>
          <p className="text-xs text-stone-500 font-serif-kr mt-0.5">
            이웃들이 나눈 오늘의 감성과 음악, 책을 만나보세요.
          </p>
        </div>

        <button
          onClick={onNavigateToCurate}
          className="px-3.5 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>내 큐레이션 작성</span>
        </button>
      </div>

      {/* Taste Twins (Compact Horizontal Scroll) */}
      <div className="bg-white border border-stone-200/80 rounded-2xl p-4 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-800 font-sans">
            취향 이웃 (Taste Twins)
          </span>
          <span className="text-[11px] text-stone-400">비슷한 감성을 지닌 친구들</span>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {tasteFriends.map(friend => (
            <div
              key={friend.id}
              className="shrink-0 p-2.5 px-3 rounded-xl bg-[#FAF8F5] border border-stone-200/70 flex items-center gap-2.5"
            >
              <span className="text-xl">{friend.avatar}</span>
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-bold text-stone-900">{friend.name}</span>
                  <span className="text-[10px] text-amber-800 font-medium">{friend.matchRate}%</span>
                </div>
                <span className="text-[10px] text-stone-500 block truncate max-w-[110px]">
                  {friend.sharedTastes[0]}
                </span>
              </div>

              <button
                onClick={() => onToggleFollowFriend(friend.id)}
                className={`p-1 rounded-full border text-xs cursor-pointer ml-1 ${
                  friend.isFollowing
                    ? 'bg-stone-800 text-white border-stone-800'
                    : 'bg-white text-stone-600 border-stone-300 hover:bg-stone-50'
                }`}
                title={friend.isFollowing ? '이웃 중' : '이웃 추가'}
              >
                {friend.isFollowing ? <UserCheck className="w-3 h-3" /> : <UserPlus className="w-3 h-3" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-xl w-fit">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === 'all'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            전체 피드
          </button>
          <button
            onClick={() => setFilter('recent')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === 'recent'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setFilter('popular')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === 'popular'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            인기 큐레이션
          </button>
        </div>

        <div className="relative w-full sm:w-56">
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="음악, 책, 아티스트 검색..."
            className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-200 bg-white text-xs font-sans text-stone-800 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400"
          />
        </div>
      </div>

      {/* Capsule Feed List */}
      <div className="space-y-6">
        {filteredCapsules.length > 0 ? (
          filteredCapsules.map(cap => (
            <CuratedCapsuleCard
              key={cap.id}
              capsule={cap}
              onLikeToggle={onLikeToggle}
              onSaveToggle={onSaveToggle}
              onAddComment={onAddComment}
              onOpenCardExport={onOpenCardExport}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-xs text-stone-500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>

    </div>
  );
};
