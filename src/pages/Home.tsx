import React from 'react';
import { Flame, BookOpen, Calendar, ChevronRight } from 'lucide-react';
import ProgressRing from '@/components/ProgressRing';
import { getMotivationalMessage } from '@/data/bibleData';
import type { JournalEntry, UserStats } from '@/hooks/useBibleStore';

interface HomeProps {
  overallPercent: number;
  otPercent: number;
  ntPercent: number;
  chaptersRead: number;
  totalChapters: number;
  stats: UserStats;
  nextChapter: { book: string; chapter: number } | null;
  recentActivity: JournalEntry[];
  onGoToRead: () => void;
}

const Home: React.FC<HomeProps> = ({
  overallPercent, otPercent, ntPercent,
  chaptersRead, totalChapters, stats,
  nextChapter, recentActivity, onGoToRead,
}) => {
  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="text-center pt-2">
        <h1 className="text-2xl font-bold text-foreground">Bible Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1">Your reading journey</p>
      </div>

      {/* Main progress ring */}
      <div className="flex justify-center">
        <ProgressRing percent={overallPercent} size={160} strokeWidth={12} label="Overall" sublabel={`${chaptersRead} of ${totalChapters} chapters`} />
      </div>

      {/* OT / NT rings */}
      <div className="flex justify-center gap-10">
        <ProgressRing percent={otPercent} size={90} strokeWidth={8} label="Old Testament" variant="accent" />
        <ProgressRing percent={ntPercent} size={90} strokeWidth={8} label="New Testament" variant="success" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-card rounded-2xl p-3 text-center card-shadow">
          <BookOpen size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-foreground">{chaptersRead}</p>
          <p className="text-[11px] text-muted-foreground">Chapters</p>
        </div>
        <div className="bg-card rounded-2xl p-3 text-center card-shadow">
          <Flame size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.streak} 🔥</p>
          <p className="text-[11px] text-muted-foreground">Streak</p>
        </div>
        <div className="bg-card rounded-2xl p-3 text-center card-shadow">
          <Calendar size={18} className="mx-auto text-accent mb-1" />
          <p className="text-lg font-bold text-foreground">{stats.totalDaysActive}</p>
          <p className="text-[11px] text-muted-foreground">Days Active</p>
        </div>
      </div>

      {/* Continue Reading */}
      {nextChapter && (
        <button onClick={onGoToRead} className="w-full bg-card rounded-2xl p-4 card-shadow flex items-center justify-between group">
          <div className="text-left">
            <p className="text-xs text-muted-foreground font-medium">Continue Reading</p>
            <p className="text-lg font-bold text-foreground">{nextChapter.book} {nextChapter.chapter}</p>
          </div>
          <ChevronRight className="text-accent group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      {/* Motivational banner */}
      <div className="bg-primary rounded-2xl p-4 text-primary-foreground">
        <p className="text-sm font-medium leading-relaxed">{getMotivationalMessage(overallPercent)}</p>
      </div>

      {/* Recent activity */}
      {recentActivity.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-foreground mb-3">Recent Activity</h2>
          <div className="space-y-2">
            {recentActivity.map(entry => (
              <div key={entry.id} className="bg-card rounded-xl p-3 card-shadow">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{entry.passage}</span>
                  <span className="text-[11px] text-muted-foreground">{entry.date}</span>
                </div>
                {entry.reflection && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.reflection}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
