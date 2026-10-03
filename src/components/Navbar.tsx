import React, { useState } from 'react';
import { Compass, Users, Bookmark, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { UserPreferences } from '../types';
import { ambientSound } from '../utils/audioPlayer';

interface NavbarProps {
  currentTab: 'curate' | 'community' | 'personalized' | 'archive';
  onSelectTab: (tab: 'curate' | 'community' | 'personalized' | 'archive') => void;
  preferences: UserPreferences;
  onOpenPreferences: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  preferences,
  onOpenPreferences,
  savedCount,
}) => {
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const toggleSound = () => {
    if (isPlayingSound) {
      ambientSound.stop();
      setIsPlayingSound(false);
    } else {
      ambientSound.playMoodAmbient(261, 'rain', 0.25);
      setIsPlayingSound(true);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => onSelectTab('curate')}
          className="cursor-pointer flex items-center gap-2.5 select-none"
        >
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center font-editorial text-sm font-semibold">
            S
          </div>
          <span className="font-editorial text-xl font-normal text-stone-900 tracking-tight">Sentir</span>
        </div>

        {/* Desktop Tabs */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-stone-200/50 rounded-xl text-xs">
          <button
            onClick={() => onSelectTab('curate')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'curate'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>큐레이션</span>
          </button>

          <button
            onClick={() => onSelectTab('community')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'community'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>취향 살롱</span>
          </button>

          <button
            onClick={() => onSelectTab('personalized')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'personalized'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>맞춤 추천</span>
          </button>

          <button
            onClick={() => onSelectTab('archive')}
            className={`px-3.5 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'archive'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>보관함</span>
            {savedCount > 0 && <span className="text-[10px] text-stone-500">({savedCount})</span>}
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Ambient Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-full border text-xs transition-colors cursor-pointer ${
              isPlayingSound
                ? 'bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white border-stone-200 text-stone-500 hover:text-stone-800'
            }`}
            title={isPlayingSound ? "배경음 끄기" : "배경음 켜기"}
          >
            {isPlayingSound ? <Volume2 className="w-4 h-4 animate-pulse text-amber-700" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* User Profile */}
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1.5 p-1.5 pl-2 pr-2.5 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-xs font-medium text-stone-700 transition-colors cursor-pointer"
          >
            <span>{preferences.avatar || '🌿'}</span>
            <span className="max-w-[70px] truncate">{preferences.nickname || '내 취향'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Tabs */}
      <div className="flex md:hidden border-t border-stone-200/60 bg-[#FBF9F5] px-2 py-1 justify-around text-xs">
        <button
          onClick={() => onSelectTab('curate')}
          className={`py-1 px-3 rounded-lg ${currentTab === 'curate' ? 'font-bold text-stone-900 bg-stone-100' : 'text-stone-500'}`}
        >
          큐레이션
        </button>
        <button
          onClick={() => onSelectTab('community')}
          className={`py-1 px-3 rounded-lg ${currentTab === 'community' ? 'font-bold text-stone-900 bg-stone-100' : 'text-stone-500'}`}
        >
          취향살롱
        </button>
        <button
          onClick={() => onSelectTab('personalized')}
          className={`py-1 px-3 rounded-lg ${currentTab === 'personalized' ? 'font-bold text-stone-900 bg-stone-100' : 'text-stone-500'}`}
        >
          맞춤추천
        </button>
        <button
          onClick={() => onSelectTab('archive')}
          className={`py-1 px-3 rounded-lg ${currentTab === 'archive' ? 'font-bold text-stone-900 bg-stone-100' : 'text-stone-500'}`}
        >
          보관함({savedCount})
        </button>
      </div>
    </header>
  );
};
