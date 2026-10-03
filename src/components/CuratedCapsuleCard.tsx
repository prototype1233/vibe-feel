import React, { useState } from 'react';
import {
  Heart,
  Bookmark,
  ExternalLink,
  Play,
  Pause,
  Coffee,
  Film,
  Wind,
  Download,
  ChevronLeft,
  ChevronRight,
  Layers,
} from 'lucide-react';
import { CuratedCapsule } from '../types';
import { musicPlayer } from '../utils/audioPlayer';

interface CuratedCapsuleCardProps {
  capsule: CuratedCapsule;
  onLikeToggle?: (capsuleId: string) => void;
  onSaveToggle?: (capsuleId: string) => void;
  onOpenCardExport?: (capsule: CuratedCapsule) => void;
}

export const CuratedCapsuleCard: React.FC<CuratedCapsuleCardProps> = ({
  capsule,
  onLikeToggle,
  onSaveToggle,
  onOpenCardExport,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  
  // Available tabs
  const availableTabs: { id: string; label: string; icon: string }[] = [];
  if (capsule.music) availableTabs.push({ id: 'music', label: '음악', icon: '🎵' });
  if (capsule.book) availableTabs.push({ id: 'books', label: '책', icon: '📚' });
  if (capsule.fashion) availableTabs.push({ id: 'fashion', label: '스타일', icon: '👗' });
  if (capsule.tea || capsule.scent || capsule.film) {
    availableTabs.push({ id: 'lifestyle', label: '라이프', icon: '🍵' });
  }

  const [activeTab, setActiveTab] = useState<string>(availableTabs[0]?.id || 'music');
  const currentIndex = availableTabs.findIndex(t => t.id === activeTab);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveTab(availableTabs[currentIndex - 1].id);
    } else {
      setActiveTab(availableTabs[availableTabs.length - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < availableTabs.length - 1) {
      setActiveTab(availableTabs[currentIndex + 1].id);
    } else {
      setActiveTab(availableTabs[0].id);
    }
  };

  const handleToggleSound = async () => {
    if (isPlayingAudio) {
      musicPlayer.stop();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      await musicPlayer.playTrackPreview(capsule.music?.trackTitle, capsule.moodVibe);
    }
  };

  const openExternalMusicSearch = (query: string) => {
    const encoded = encodeURIComponent(query);
    window.open(`https://www.youtube.com/results?search_query=${encoded}`, '_blank');
  };

  return (
    <article className="bg-white border border-stone-200/90 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all max-w-xl mx-auto">
      
      {/* Top Color Accent */}
      <div 
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${capsule.moodColor.primaryHex} 0%, ${capsule.moodColor.secondaryHex} 100%)`
        }}
      />

      <div className="p-5 sm:p-6 space-y-4">
        
        {/* Header: Date & Mood */}
        <div className="flex items-center justify-between text-xs text-stone-500 border-b border-stone-100 pb-2">
          <span className="font-serif-kr text-[11px] text-stone-400">{capsule.createdAt}</span>
          <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 font-serif-kr text-[11px]">
            {capsule.moodVibe}
          </span>
        </div>

        {/* Short Summary (One crisp line only) */}
        <h3 className="font-serif-kr text-base sm:text-lg text-stone-900 font-semibold leading-snug">
          "{capsule.poeticSummary}"
        </h3>

        {/* Category Tabs */}
        <div className="flex items-center justify-between border-b border-stone-100 pb-2">
          <div className="flex items-center gap-1">
            {availableTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200/70'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setActiveTab(activeTab === 'all' ? availableTabs[0]?.id || 'music' : 'all')}
            className={`p-1 rounded-lg text-xs flex items-center gap-1 cursor-pointer ${
              activeTab === 'all' ? 'bg-stone-800 text-white' : 'text-stone-400 hover:text-stone-700'
            }`}
            title="전체보기 전환"
          >
            <Layers className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Card Content */}
        <div>
          
          {/* 1. MUSIC CARD */}
          {capsule.music && (activeTab === 'music' || activeTab === 'all') && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-serif-kr font-bold text-stone-900">
                    {capsule.music.trackTitle}
                  </div>
                  <div className="text-xs text-stone-500 font-sans mt-0.5 flex items-center gap-2">
                    <span>{capsule.music.artist}</span>
                    {isPlayingAudio && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-full font-medium">
                        <span className="w-1 h-2.5 bg-amber-700 rounded-full animate-bounce" />
                        <span className="w-1 h-3.5 bg-amber-700 rounded-full animate-bounce [animation-delay:0.15s]" />
                        <span className="w-1 h-2 bg-amber-700 rounded-full animate-bounce [animation-delay:0.3s]" />
                        <span>재생 중</span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleToggleSound}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                      isPlayingAudio
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-white border border-stone-300 text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {isPlayingAudio ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                    <span className="text-[11px]">{isPlayingAudio ? '정지' : '미리듣기'}</span>
                  </button>

                  <button
                    onClick={() => openExternalMusicSearch(`${capsule.music?.artist} ${capsule.music?.trackTitle}`)}
                    className="p-1 rounded-full text-stone-400 hover:text-stone-700 cursor-pointer"
                    title="유튜브 검색"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {capsule.music.keyLyric && (
                <p className="text-xs text-stone-700 font-serif-kr italic bg-white p-2.5 rounded-lg border border-stone-200/60">
                  "{capsule.music.keyLyric}"
                </p>
              )}
            </div>
          )}

          {/* 2. BOOK CARD */}
          {capsule.book && (activeTab === 'books' || activeTab === 'all') && (
            <div className={`p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70 space-y-3 ${activeTab === 'all' ? 'mt-3' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-base font-serif-kr font-bold text-stone-900">
                    {capsule.book.title}
                  </div>
                  <div className="text-xs text-stone-500">
                    {capsule.book.author}
                  </div>
                </div>

                <span className="text-[11px] text-stone-400 font-serif-kr">
                  {capsule.book.genre}
                </span>
              </div>

              <blockquote className="text-xs text-stone-800 font-serif-kr bg-white p-2.5 rounded-lg border-l-3 border-amber-800/80 italic leading-relaxed">
                "{capsule.book.quote}"
              </blockquote>
            </div>
          )}

          {/* 3. FASHION CARD */}
          {capsule.fashion && (activeTab === 'fashion' || activeTab === 'all') && (
            <div className={`p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70 space-y-3 ${activeTab === 'all' ? 'mt-3' : ''}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-serif-kr font-bold text-stone-900">
                  {capsule.fashion.conceptTitle}
                </span>

                <div className="flex items-center gap-1">
                  {capsule.fashion.colorPalette.map((c, i) => (
                    <span
                      key={i}
                      className="w-3 h-3 rounded-full border border-stone-300 inline-block"
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs bg-white p-2.5 rounded-lg border border-stone-200/60">
                <div>
                  <span className="text-[10px] text-stone-400 block">상의</span>
                  <span className="font-medium text-stone-800 truncate block">{capsule.fashion.topItem}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">하의</span>
                  <span className="font-medium text-stone-800 truncate block">{capsule.fashion.bottomItem}</span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 block">포인트</span>
                  <span className="font-medium text-stone-800 truncate block">{capsule.fashion.outerOrAccent}</span>
                </div>
              </div>
            </div>
          )}

          {/* 4. LIFESTYLE CARD */}
          {(capsule.tea || capsule.scent || capsule.film) && (activeTab === 'lifestyle' || activeTab === 'all') && (
            <div className={`p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/70 space-y-2.5 ${activeTab === 'all' ? 'mt-3' : ''}`}>
              {capsule.tea && (
                <div className="bg-white p-2.5 rounded-lg border border-stone-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-stone-900">
                    <Coffee className="w-3.5 h-3.5 text-amber-800" />
                    <span>{capsule.tea.blendName}</span>
                  </div>
                  <span className="text-stone-500 text-[11px] truncate max-w-[180px]">
                    {capsule.tea.flavorNotes.join(', ')}
                  </span>
                </div>
              )}

              {capsule.scent && (
                <div className="bg-white p-2.5 rounded-lg border border-stone-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-stone-900">
                    <Wind className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{capsule.scent.name}</span>
                  </div>
                  <span className="text-stone-500 text-[11px] truncate max-w-[180px]">
                    {capsule.scent.notes}
                  </span>
                </div>
              )}

              {capsule.film && (
                <div className="bg-white p-2.5 rounded-lg border border-stone-200/60 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-medium text-stone-900">
                    <Film className="w-3.5 h-3.5 text-stone-700" />
                    <span>{capsule.film.title}</span>
                  </div>
                  <span className="text-stone-500 text-[11px] italic truncate max-w-[180px]">
                    "{capsule.film.famousLine}"
                  </span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Navigation (< 이전 / 다음 >) - Only visible in slide mode */}
        {activeTab !== 'all' && availableTabs.length > 1 && (
          <div className="flex items-center justify-between pt-1 text-xs text-stone-500">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>이전</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {availableTabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    activeTab === t.id ? 'w-4 bg-stone-900' : 'w-1.5 bg-stone-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-50 text-stone-700 cursor-pointer"
            >
              <span>다음</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Actions Bar */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onLikeToggle && onLikeToggle(capsule.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                capsule.likedByMe
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${capsule.likedByMe ? 'fill-rose-600 text-rose-600' : ''}`} />
              <span>{capsule.likes || 0}</span>
            </button>

            <button
              onClick={() => onSaveToggle && onSaveToggle(capsule.id)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                capsule.savedByMe
                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                  : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${capsule.savedByMe ? 'fill-amber-700 text-amber-700' : ''}`} />
              <span>{capsule.savedByMe ? '보관됨' : '보관하기'}</span>
            </button>
          </div>

          <div>
            {onOpenCardExport && (
              <button
                onClick={() => onOpenCardExport(capsule)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-stone-200 text-stone-600 hover:bg-stone-50 transition-colors cursor-pointer text-xs"
                title="감성 엽서 카드 저장"
              >
                <Download className="w-3.5 h-3.5" />
                <span>엽서 저장</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </article>
  );
};
