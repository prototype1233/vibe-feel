import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { MoodInputSection } from './components/MoodInputSection';
import { CuratedCapsuleCard } from './components/CuratedCapsuleCard';
import { PersonalizedForYou } from './components/PersonalizedForYou';
import { MyArchive } from './components/MyArchive';
import { TastePreferenceModal } from './components/TastePreferenceModal';
import { SharePostcardModal } from './components/SharePostcardModal';
import { CategoryType, CuratedCapsule, UserPreferences } from './types';
import { generateOfflineCapsule } from './data/curationEngine';

const DEFAULT_PREFERENCES: UserPreferences = {
  nickname: '연우 (Yeonwoo)',
  avatar: '🌿',
  bio: '느린 피아노 선율과 종이책 냄새, 편안한 린넨 셔츠를 사랑합니다.',
  musicGenres: ['Indie Folk (인디 포크)', 'Lo-Fi Jazz (로파이 재즈)', 'Neo-Classical (네오 클래시컬)'],
  bookGenres: ['감성 에세이 / 산문', '한국 현대 소설'],
  fashionStyles: ['미니멀 놈코어 (Minimal)', '내추럴 코지 캐주얼 (Natural Cozy)'],
  favoriteScents: ['우디 & 시더우드 (Woody)', '포근한 린넨 & 코튼 (Linen)'],
  vibeKeywords: ['사색적인', '따스한', '고즈넉한'],
  onboardingCompleted: true,
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<'curate' | 'personalized' | 'archive'>('curate');
  
  // User Preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('sentir_user_preferences');
      return saved ? JSON.parse(saved) : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // Capsules State
  const [currentCapsule, setCurrentCapsule] = useState<CuratedCapsule | null>(null);

  const [myHistoryCapsules, setMyHistoryCapsules] = useState<CuratedCapsule[]>(() => {
    try {
      const saved = localStorage.getItem('sentir_my_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [savedCapsules, setSavedCapsules] = useState<CuratedCapsule[]>(() => {
    try {
      const saved = localStorage.getItem('sentir_saved_capsules');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [dailyCapsule, setDailyCapsule] = useState<CuratedCapsule | null>(null);

  // UI States
  const [isLoadingCuration, setIsLoadingCuration] = useState(false);
  const [isRefreshingDaily, setIsRefreshingDaily] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [exportCapsule, setExportCapsule] = useState<CuratedCapsule | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('sentir_user_preferences', JSON.stringify(preferences));
    } catch {
      // Ignore
    }
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem('sentir_my_history', JSON.stringify(myHistoryCapsules));
    } catch {
      // Ignore
    }
  }, [myHistoryCapsules]);

  useEffect(() => {
    try {
      localStorage.setItem('sentir_saved_capsules', JSON.stringify(savedCapsules));
    } catch {
      // Ignore
    }
  }, [savedCapsules]);

  // Generate initial daily capsule on mount
  useEffect(() => {
    const daily = generateOfflineCapsule(
      '오늘 하루, 당신의 마음을 보듬는 온전한 감성 페어링',
      '나른한 일요일의 쉼',
      'sunny',
      ['music', 'books', 'fashion', 'tea', 'scent'],
      preferences
    );
    setDailyCapsule(daily);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Perform AI or Curated Curation
  const handleCurate = async (
    thought: string,
    moodVibe: string,
    weather: string,
    categories: CategoryType[]
  ) => {
    setIsLoadingCuration(true);

    try {
      const response = await fetch('/api/curate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thought,
          moodVibe,
          weather,
          categories,
          preferences,
        }),
      });

      if (!response.ok) {
        throw new Error('API server returned error');
      }

      const data = await response.json();
      if (data.capsule) {
        setCurrentCapsule(data.capsule);
        setMyHistoryCapsules(prev => [data.capsule, ...prev]);
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D97706', '#84A98C', '#64748B', '#78593A'],
        });
        showToast('오늘의 감성 큐레이션이 완성되었습니다.');
      }
    } catch (err) {
      console.warn('Backend curate call error, using local fallback:', err);
      const fallback = generateOfflineCapsule(thought, moodVibe, weather, categories, preferences);
      setCurrentCapsule(fallback);
      setMyHistoryCapsules(prev => [fallback, ...prev]);
      showToast('감성 큐레이션 캡슐이 생성되었습니다.');
    } finally {
      setIsLoadingCuration(false);
    }
  };

  // Refresh Daily Personalized Capsule
  const handleRefreshDailyCapsule = async () => {
    setIsRefreshingDaily(true);
    try {
      const response = await fetch('/api/personalized-daily', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences }),
      });
      const data = await response.json();
      if (data.capsule) {
        setDailyCapsule(data.capsule);
      }
    } catch {
      const updated = generateOfflineCapsule(
        '새롭게 빚어낸 오늘의 취향 조각들',
        '벅차오르는 설렘과 용기',
        'sunny',
        ['music', 'books', 'fashion', 'tea', 'scent'],
        preferences
      );
      setDailyCapsule(updated);
    } finally {
      setIsRefreshingDaily(false);
    }
  };

  // Like Toggle
  const handleLikeToggle = (capsuleId: string) => {
    const updateList = (list: CuratedCapsule[]) =>
      list.map(c => {
        if (c.id === capsuleId) {
          const isLiked = !c.likedByMe;
          return {
            ...c,
            likedByMe: isLiked,
            likes: isLiked ? (c.likes || 0) + 1 : Math.max(0, (c.likes || 0) - 1),
          };
        }
        return c;
      });

    setMyHistoryCapsules(prev => updateList(prev));
    setSavedCapsules(prev => updateList(prev));
    if (currentCapsule && currentCapsule.id === capsuleId) {
      setCurrentCapsule(prev => (prev ? updateList([prev])[0] : null));
    }
    if (dailyCapsule && dailyCapsule.id === capsuleId) {
      setDailyCapsule(prev => (prev ? updateList([prev])[0] : null));
    }
  };

  // Save / Bookmark Toggle
  const handleSaveToggle = (capsuleId: string) => {
    let target = currentCapsule?.id === capsuleId ? currentCapsule : null;
    if (!target) target = myHistoryCapsules.find(c => c.id === capsuleId) || null;
    if (!target) target = dailyCapsule?.id === capsuleId ? dailyCapsule : null;
    if (!target) target = savedCapsules.find(c => c.id === capsuleId) || null;

    if (!target) return;

    const alreadySaved = savedCapsules.some(c => c.id === capsuleId);

    if (alreadySaved) {
      setSavedCapsules(prev => prev.filter(c => c.id !== capsuleId));
      showToast('보관함에서 제거되었습니다.');
    } else {
      const savedVersion = { ...target, savedByMe: true };
      setSavedCapsules(prev => [savedVersion, ...prev]);
      showToast('보관함에 저장되었습니다.');
    }

    // Toggle saved flag on active items
    const updateSavedFlag = (c: CuratedCapsule) => (c.id === capsuleId ? { ...c, savedByMe: !alreadySaved } : c);
    setMyHistoryCapsules(prev => prev.map(updateSavedFlag));
    if (currentCapsule && currentCapsule.id === capsuleId) {
      setCurrentCapsule(prev => (prev ? updateSavedFlag(prev) : null));
    }
    if (dailyCapsule && dailyCapsule.id === capsuleId) {
      setDailyCapsule(prev => (prev ? updateSavedFlag(prev) : null));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-stone-900 selection:bg-amber-100 selection:text-stone-900">
      
      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        preferences={preferences}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        savedCount={savedCapsules.length}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        
        {/* VIEW 1: CURATION */}
        {currentTab === 'curate' && (
          <div className="space-y-6">
            
            {/* Input Form */}
            <MoodInputSection
              onCurate={handleCurate}
              isLoading={isLoadingCuration}
            />

            {/* Generated Capsule Result */}
            {currentCapsule && (
              <section className="space-y-3 pt-2">
                <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                  <span className="text-xs font-semibold text-stone-800 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
                    <span>오늘의 감성 큐레이션 결과</span>
                  </span>
                  <button
                    onClick={() => {
                      setCurrentCapsule(null);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer"
                  >
                    새로 작성하기
                  </button>
                </div>

                <CuratedCapsuleCard
                  capsule={currentCapsule}
                  onLikeToggle={handleLikeToggle}
                  onSaveToggle={handleSaveToggle}
                  onOpenCardExport={setExportCapsule}
                />
              </section>
            )}

          </div>
        )}

        {/* VIEW 2: PERSONALIZED FOR YOU */}
        {currentTab === 'personalized' && (
          <PersonalizedForYou
            preferences={preferences}
            onOpenPreferencesModal={() => setIsPreferencesOpen(true)}
            dailyCapsule={dailyCapsule}
            onRefreshDailyCapsule={handleRefreshDailyCapsule}
            isRefreshing={isRefreshingDaily}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onOpenCardExport={setExportCapsule}
          />
        )}

        {/* VIEW 3: MY ARCHIVE */}
        {currentTab === 'archive' && (
          <MyArchive
            savedCapsules={savedCapsules}
            myHistoryCapsules={myHistoryCapsules}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onOpenCardExport={setExportCapsule}
            onNavigateToCurate={() => setCurrentTab('curate')}
          />
        )}

      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200/80 py-6 text-center text-xs text-stone-400 font-sans">
        Sentir · 감성 라이프스타일 큐레이션
      </footer>

      {/* Preferences Calibration Modal */}
      <TastePreferenceModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onSavePreferences={updated => {
          setPreferences(updated);
          showToast('취향 프로필이 업데이트되었습니다.');
        }}
      />

      {/* Aesthetic Postcard Export Modal */}
      <SharePostcardModal
        isOpen={Boolean(exportCapsule)}
        onClose={() => setExportCapsule(null)}
        capsule={exportCapsule}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-serif-kr px-4 py-2.5 rounded-xl shadow-lg border border-stone-800 animate-fade-in flex items-center gap-1.5">
          <span className="text-amber-400">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
