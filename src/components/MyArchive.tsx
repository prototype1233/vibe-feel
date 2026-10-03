import React, { useState } from 'react';
import { Bookmark, Clock } from 'lucide-react';
import { CuratedCapsule } from '../types';
import { CuratedCapsuleCard } from './CuratedCapsuleCard';

interface MyArchiveProps {
  savedCapsules: CuratedCapsule[];
  myHistoryCapsules: CuratedCapsule[];
  onLikeToggle: (capsuleId: string) => void;
  onSaveToggle: (capsuleId: string) => void;
  onOpenCardExport: (capsule: CuratedCapsule) => void;
  onNavigateToCurate: () => void;
}

export const MyArchive: React.FC<MyArchiveProps> = ({
  savedCapsules,
  myHistoryCapsules,
  onLikeToggle,
  onSaveToggle,
  onOpenCardExport,
  onNavigateToCurate,
}) => {
  const [archiveTab, setArchiveTab] = useState<'history' | 'saved'>('history');

  const activeList = archiveTab === 'history' ? myHistoryCapsules : savedCapsules;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-4 border-b border-stone-200/80 pb-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif-kr font-semibold text-stone-900">
            나의 보관함
          </h2>
          <p className="text-xs text-stone-500 font-serif-kr mt-0.5">
            기록했던 생각과 마음에 든 캡슐들을 모아둔 공간입니다.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-stone-200/60 rounded-xl text-xs">
          <button
            onClick={() => setArchiveTab('history')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              archiveTab === 'history'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>내 기록 ({myHistoryCapsules.length})</span>
          </button>

          <button
            onClick={() => setArchiveTab('saved')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              archiveTab === 'saved'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-800" />
            <span>저장함 ({savedCapsules.length})</span>
          </button>
        </div>
      </div>

      {/* Capsule List */}
      <div className="space-y-6">
        {activeList.length > 0 ? (
          activeList.map(cap => (
            <CuratedCapsuleCard
              key={cap.id}
              capsule={cap}
              onLikeToggle={onLikeToggle}
              onSaveToggle={onSaveToggle}
              onOpenCardExport={onOpenCardExport}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-stone-200 p-10 text-center space-y-3">
            <p className="text-xs text-stone-500 font-serif-kr">
              {archiveTab === 'history' ? '아직 기록된 캡슐이 없습니다.' : '보관된 캡슐이 없습니다.'}
            </p>
            <button
              onClick={onNavigateToCurate}
              className="px-4 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium cursor-pointer"
            >
              오늘의 큐레이션 작성하기
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
