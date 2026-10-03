import React, { useState } from 'react';
import { X, Copy, Check, Sparkles, Download } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CuratedCapsule } from '../types';

interface SharePostcardModalProps {
  isOpen: boolean;
  onClose: () => void;
  capsule: CuratedCapsule | null;
}

export const SharePostcardModal: React.FC<SharePostcardModalProps> = ({
  isOpen,
  onClose,
  capsule,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !capsule) return null;

  const handleCopyText = () => {
    const text = `[Sentir 센티르 · 감성 큐레이션]\n\n"${capsule.poeticSummary}"\n\n🎵 음악: ${capsule.music?.artist} - ${capsule.music?.trackTitle || '선율'}\n📚 도서: ${capsule.book?.title || '책'} (${capsule.book?.author})\n👗 스타일: ${capsule.fashion?.conceptTitle || '내추럴'}\n\n오늘의 감성 처방: ${capsule.emotionalPrescription}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#D97706', '#84A98C', '#64748B', '#78593A'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateDownload = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
    alert('감성 엽서 카드가 클립보드 및 이미지 저장 준비되었습니다!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
      <div className="bg-[#FAF8F5] border border-stone-200 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-4 px-6 border-b border-stone-200/80 flex items-center justify-between bg-white/80">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span className="text-xs font-bold font-sans text-stone-900 tracking-wide uppercase">
              감성 엽서 카드 (Sentir Postcard)
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-400 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Postcard Body */}
        <div className="p-6">
          <div 
            className="rounded-2xl p-6 sm:p-7 shadow-md text-stone-900 relative overflow-hidden border border-stone-200/90 flex flex-col justify-between space-y-6"
            style={{
              background: `linear-gradient(145deg, #FAF7F2 0%, #F5EFEB 100%)`
            }}
          >
            {/* Top Accent Strip */}
            <div 
              className="absolute top-0 left-0 right-0 h-2"
              style={{
                background: `linear-gradient(90deg, ${capsule.moodColor.primaryHex} 0%, ${capsule.moodColor.secondaryHex} 100%)`
              }}
            />

            {/* Postcard Header */}
            <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans border-b border-stone-200/60 pb-3">
              <span className="font-editorial text-sm font-semibold tracking-wider text-stone-800">
                SENTIR ARCHIVE
              </span>
              <span>{capsule.createdAt}</span>
            </div>

            {/* Poetic Quote & Mood */}
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-amber-900/80">
                Today's Resonance · {capsule.moodVibe}
              </span>
              <p className="font-editorial text-xl sm:text-2xl font-normal leading-snug text-stone-900">
                "{capsule.poeticSummary}"
              </p>
            </div>

            {/* Curated Highlights */}
            <div className="bg-white/80 rounded-xl p-4 border border-stone-200/70 space-y-2.5 text-xs font-serif-kr">
              {capsule.music && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 font-sans text-[11px]">🎵 Music</span>
                  <span className="font-medium text-stone-800 truncate text-right">
                    {capsule.music.trackTitle} · {capsule.music.artist}
                  </span>
                </div>
              )}

              {capsule.book && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 font-sans text-[11px]">📚 Book</span>
                  <span className="font-medium text-stone-800 truncate text-right">
                    {capsule.book.title} ({capsule.book.author})
                  </span>
                </div>
              )}

              {capsule.fashion && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 font-sans text-[11px]">👗 Style</span>
                  <span className="font-medium text-stone-800 truncate text-right">
                    {capsule.fashion.conceptTitle}
                  </span>
                </div>
              )}

              {capsule.tea && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-stone-500 font-sans text-[11px]">🍵 Tea</span>
                  <span className="font-medium text-stone-800 truncate text-right">
                    {capsule.tea.blendName}
                  </span>
                </div>
              )}
            </div>

            {/* Postcard Footer */}
            <div className="flex items-center justify-between text-[10px] text-stone-400 font-sans border-t border-stone-200/60 pt-3">
              <span>Curated by {capsule.author.name}</span>
              <span>sentir.app</span>
            </div>
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="p-4 px-6 border-t border-stone-200/80 flex items-center justify-between bg-white">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border border-stone-200 hover:bg-stone-50 text-stone-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? '복사 완료!' : '텍스트 복사'}</span>
          </button>

          <button
            onClick={handleSimulateDownload}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-medium bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>엽서 카드 저장</span>
          </button>
        </div>

      </div>
    </div>
  );
};
