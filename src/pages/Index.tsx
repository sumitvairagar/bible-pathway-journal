import React, { useState, useCallback } from 'react';
import { useBibleStore } from '@/hooks/useBibleStore';
import BottomTabs from '@/components/BottomTabs';
import Confetti from '@/components/Confetti';
import Home from '@/pages/Home';
import Read from '@/pages/Read';
import BibleExplorer from '@/pages/BibleExplorer';
import Journal from '@/pages/Journal';

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const store = useBibleStore();

  const handleSubmitReading = useCallback((entry: Parameters<typeof store.addJournalEntry>[0]) => {
    store.addJournalEntry(entry);
    // Check if a book was just completed
    entry.chaptersRead.forEach(({ book }) => {
      const bp = store.getBookProgress(book);
      // After adding, re-check (progress updates are async in state, so approximate)
      if (bp.read + entry.chaptersRead.find(c => c.book === book)!.chapters.length >= bp.total) {
        setShowConfetti(true);
      }
    });
  }, [store]);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[430px] px-4 pb-20 safe-bottom">
        <Confetti show={showConfetti} onDone={() => setShowConfetti(false)} />
        
        {activeTab === 0 && (
          <Home
            overallPercent={store.overallPercent}
            otPercent={store.otPercent}
            ntPercent={store.ntPercent}
            chaptersRead={store.chaptersRead}
            totalChapters={store.totalChapters}
            stats={store.stats}
            nextChapter={store.getNextChapter()}
            recentActivity={store.getRecentActivity()}
            onGoToRead={() => setActiveTab(1)}
          />
        )}
        {activeTab === 1 && (
          <Read
            progress={store.progress}
            onSubmit={handleSubmitReading}
            toggleChapter={store.toggleChapter}
          />
        )}
        {activeTab === 2 && (
          <BibleExplorer
            progress={store.progress}
            getBookProgress={store.getBookProgress}
            toggleChapter={store.toggleChapter}
            journal={store.journal}
          />
        )}
        {activeTab === 3 && (
          <Journal journal={store.journal} />
        )}
      </div>

      <BottomTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
