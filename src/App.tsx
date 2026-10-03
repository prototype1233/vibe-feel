import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { MoodInputSection } from './components/MoodInputSection';
import { CuratedCapsuleCard } from './components/CuratedCapsuleCard';
import { CommunityLounge } from './components/CommunityLounge';
import { PersonalizedForYou } from './components/PersonalizedForYou';
import { MyArchive } from './components/MyArchive';
import { TastePreferenceModal } from './components/TastePreferenceModal';
import { SharePostcardModal } from './components/SharePostcardModal';
import { CategoryType, CuratedCapsule, TasteFriend, UserPreferences } from './types';
import { INITIAL_COMMUNITY_CAPSULES, INITIAL_TASTE_FRIENDS } from './data/mockCommunity';
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
  const [currentTab, setCurrentTab] = useState<'curate' | 'community' | 'personalized' | 'archive'>('curate');
  
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
  const [communityCapsules, setCommunityCapsules] = useState<CuratedCapsule[]>(() => {
    try {
      const saved = localStorage.getItem('sentir_community_capsules');
      return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_CAPSULES;
    } catch {
      return INITIAL_COMMUNITY_CAPSULES;
    }
  });

  const [myHistoryCapsules, setMyHistoryCapsules] = useState<CuratedCapsule[]>(() => {
    try {
      const saved = localStorage.getItem('sentir_my_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [tasteFriends, setTasteFriends] = useState<TasteFriend[]>(INITIAL_TASTE_FRIENDS);
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
      // Ignore storage errors
    }
  }, [preferences]);

  useEffect(() => {
    try {
      localStorage.setItem('sentir_community_capsules', JSON.stringify(communityCapsules));
    } catch {
      // Ignore
    }
  }, [communityCapsules]);

  useEffect(() => {
    try {
      localStorage.setItem('sentir_my_history', JSON.stringify(myHistoryCapsules));
    } catch {
      // Ignore
    }
  }, [myHistoryCapsules]);

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
    setTimeout(() => setToastMessage(null), 3500);
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
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D97706', '#84A98C', '#64748B', '#78593A'],
        });
        showToast('오늘의 감성 큐레이션 캡슐이 정성스럽게 완성되었습니다.');
      }
    } catch (err) {
      console.warn('Backend curate call error, using local fallback:', err);
      // Seamless client-side fallback
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

    setCommunityCapsules(prev => updateList(prev));
    setMyHistoryCapsules(prev => updateList(prev));
    if (currentCapsule && currentCapsule.id === capsuleId) {
      setCurrentCapsule(prev => (prev ? updateList([prev])[0] : null));
    }
    if (dailyCapsule && dailyCapsule.id === capsuleId) {
      setDailyCapsule(prev => (prev ? updateList([prev])[0] : null));
    }
  };

  // Save / Bookmark Toggle
  const handleSaveToggle = (capsuleId: string) => {
    const updateList = (list: CuratedCapsule[]) =>
      list.map(c => {
        if (c.id === capsuleId) {
          return { ...c, savedByMe: !c.savedByMe };
        }
        return c;
      });

    setCommunityCapsules(prev => updateList(prev));
    setMyHistoryCapsules(prev => updateList(prev));
    if (currentCapsule && currentCapsule.id === capsuleId) {
      setCurrentCapsule(prev => (prev ? updateList([prev])[0] : null));
    }
    if (dailyCapsule && dailyCapsule.id === capsuleId) {
      setDailyCapsule(prev => (prev ? updateList([prev])[0] : null));
    }
    showToast('나의 감성 서재에 보관 상태가 변경되었습니다.');
  };

  // Add Comment
  const handleAddComment = (capsuleId: string, text: string) => {
    const newComment = {
      id: 'comment_' + Date.now(),
      authorName: preferences.nickname || '나의 취향',
      authorAvatar: preferences.avatar || '🌿',
      text,
      createdAt: '방금 전',
    };

    const updateComments = (list: CuratedCapsule[]) =>
      list.map(c => {
        if (c.id === capsuleId) {
          return {
            ...c,
            comments: [...(c.comments || []), newComment],
          };
        }
        return c;
      });

    setCommunityCapsules(prev => updateComments(prev));
    setMyHistoryCapsules(prev => updateComments(prev));
    if (currentCapsule && currentCapsule.id === capsuleId) {
      setCurrentCapsule(prev => (prev ? updateComments([prev])[0] : null));
    }
    if (dailyCapsule && dailyCapsule.id === capsuleId) {
      setDailyCapsule(prev => (prev ? updateComments([prev])[0] : null));
    }
  };

  // Share to Lounge
  const handleShareToCommunity = (capsule: CuratedCapsule) => {
    // Check if already in community
    const exists = communityCapsules.some(c => c.id === capsule.id);
    if (!exists) {
      const publicVersion = {
        ...capsule,
        isPublic: true,
        createdAt: '방금 전',
        author: {
          id: 'me',
          name: preferences.nickname || '나의 취향',
          avatar: preferences.avatar || '🌿',
          tasteTag: preferences.vibeKeywords?.[0] || '감성 아키비스트',
        },
      };
      setCommunityCapsules(prev => [publicVersion, ...prev]);
    }

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });
    showToast('취향 살롱에 오늘의 감성 캡슐이 공유되었습니다!');
    setCurrentTab('community');
  };

  // Follow Friend
  const handleToggleFollowFriend = (friendId: string) => {
    setTasteFriends(prev =>
      prev.map(f => {
        if (f.id === friendId) {
          const updated = !f.isFollowing;
          showToast(updated ? `${f.name} 님을 취향 이웃으로 추가했습니다.` : `${f.name} 님을 팔로우 해제했습니다.`);
          return { ...f, isFollowing: updated };
        }
        return f;
      })
    );
  };

  // Compute all saved capsules
  const savedCapsules = [
    ...communityCapsules.filter(c => c.savedByMe),
    ...myHistoryCapsules.filter(c => c.savedByMe),
  ].filter((c, index, self) => index === self.findIndex(t => t.id === c.id));

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
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        
        {/* VIEW 1: CURATION STUDIO */}
        {currentTab === 'curate' && (
          <div className="space-y-8">
            
            {/* Input Form */}
            <MoodInputSection
              onCurate={handleCurate}
              isLoading={isLoadingCuration}
            />

            {/* Generated Capsule Result */}
            {currentCapsule && (
              <section className="space-y-4 pt-2">
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
                  onShareToCommunity={handleShareToCommunity}
                  onOpenCardExport={setExportCapsule}
                  onAddComment={handleAddComment}
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
            onAddComment={handleAddComment}
          />
        )}

        {/* VIEW 3: COMMUNITY LOUNGE */}
        {currentTab === 'community' && (
          <CommunityLounge
            capsules={communityCapsules}
            tasteFriends={tasteFriends}
            onToggleFollowFriend={handleToggleFollowFriend}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onAddComment={handleAddComment}
            onOpenCardExport={setExportCapsule}
            onNavigateToCurate={() => setCurrentTab('curate')}
          />
        )}

        {/* VIEW 4: MY ARCHIVE */}
        {currentTab === 'archive' && (
          <MyArchive
            savedCapsules={savedCapsules}
            myHistoryCapsules={myHistoryCapsules}
            onLikeToggle={handleLikeToggle}
            onSaveToggle={handleSaveToggle}
            onOpenCardExport={setExportCapsule}
            onAddComment={handleAddComment}
            onNavigateToCurate={() => setCurrentTab('curate')}
          />
        )}

      </main>

      {/* Editorial Footer */}
      <footer className="border-t border-stone-200/80 py-8 text-center text-xs text-stone-400 font-sans">
        Sentir · 감성 라이프스타일 큐레이션
      </footer>

      {/* Preferences Calibration Modal */}
      <TastePreferenceModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onSavePreferences={updated => {
          setPreferences(updated);
          showToast('취향 프로필이 성공적으로 업데이트되었습니다.');
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
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs font-serif-kr px-4 py-3 rounded-2xl shadow-xl border border-stone-800 animate-fade-in flex items-center gap-2">
          <span className="text-amber-400">✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
