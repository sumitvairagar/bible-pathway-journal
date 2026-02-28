import { useState, useCallback, useEffect } from 'react';
import { BIBLE_BOOKS, TOTAL_CHAPTERS, OT_CHAPTERS, NT_CHAPTERS } from '@/data/bibleData';

export interface JournalEntry {
  id: string;
  date: string;
  passage: string;
  reflection: string;
  tags: string[];
  verse: string;
  chaptersRead: { book: string; chapters: number[] }[];
}

export interface UserStats {
  streak: number;
  lastReadDate: string;
  totalDaysActive: number;
  badgesEarned: string[];
}

type BibleProgress = Record<string, boolean[]>;

function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

function initProgress(): BibleProgress {
  const stored = loadJSON<BibleProgress>('bible_progress', {});
  const result: BibleProgress = {};
  for (const book of BIBLE_BOOKS) {
    result[book.name] = stored[book.name] || new Array(book.chapters).fill(false);
  }
  return result;
}

export function useBibleStore() {
  const [progress, setProgress] = useState<BibleProgress>(initProgress);
  const [journal, setJournal] = useState<JournalEntry[]>(() => loadJSON('journal_entries', []));
  const [stats, setStats] = useState<UserStats>(() => loadJSON('user_stats', {
    streak: 0, lastReadDate: '', totalDaysActive: 0, badgesEarned: []
  }));

  useEffect(() => { saveJSON('bible_progress', progress); }, [progress]);
  useEffect(() => { saveJSON('journal_entries', journal); }, [journal]);
  useEffect(() => { saveJSON('user_stats', stats); }, [stats]);

  const toggleChapter = useCallback((book: string, chapter: number) => {
    setProgress(prev => {
      const arr = [...(prev[book] || [])];
      arr[chapter - 1] = !arr[chapter - 1];
      return { ...prev, [book]: arr };
    });
  }, []);

  const markChapters = useCallback((book: string, chapters: number[], read: boolean) => {
    setProgress(prev => {
      const arr = [...(prev[book] || [])];
      chapters.forEach(ch => { arr[ch - 1] = read; });
      return { ...prev, [book]: arr };
    });
  }, []);

  const addJournalEntry = useCallback((entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setJournal(prev => [newEntry, ...prev]);

    // Mark chapters as read
    entry.chaptersRead.forEach(({ book, chapters }) => {
      markChapters(book, chapters, true);
    });

    // Update stats
    setStats(prev => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      let newStreak = prev.streak;
      let newDays = prev.totalDaysActive;

      if (prev.lastReadDate !== today) {
        newDays++;
        if (prev.lastReadDate === yesterday) {
          newStreak++;
        } else if (prev.lastReadDate !== today) {
          newStreak = 1;
        }
      }

      return { ...prev, streak: newStreak, lastReadDate: today, totalDaysActive: newDays };
    });
  }, [markChapters]);

  // Computed stats
  const chaptersRead = Object.values(progress).flat().filter(Boolean).length;
  const otRead = BIBLE_BOOKS.filter(b => b.testament === 'OT')
    .reduce((sum, b) => sum + (progress[b.name]?.filter(Boolean).length || 0), 0);
  const ntRead = BIBLE_BOOKS.filter(b => b.testament === 'NT')
    .reduce((sum, b) => sum + (progress[b.name]?.filter(Boolean).length || 0), 0);

  const overallPercent = Math.round((chaptersRead / TOTAL_CHAPTERS) * 100);
  const otPercent = Math.round((otRead / OT_CHAPTERS) * 100);
  const ntPercent = Math.round((ntRead / NT_CHAPTERS) * 100);

  const getBookProgress = useCallback((bookName: string) => {
    const arr = progress[bookName] || [];
    const read = arr.filter(Boolean).length;
    const total = arr.length;
    return { read, total, percent: total > 0 ? Math.round((read / total) * 100) : 0 };
  }, [progress]);

  const getNextChapter = useCallback((): { book: string; chapter: number } | null => {
    for (const book of BIBLE_BOOKS) {
      const arr = progress[book.name] || [];
      const idx = arr.findIndex(v => !v);
      if (idx !== -1) return { book: book.name, chapter: idx + 1 };
    }
    return null;
  }, [progress]);

  const getRecentActivity = useCallback(() => {
    return journal.slice(0, 5);
  }, [journal]);

  return {
    progress, journal, stats,
    toggleChapter, markChapters, addJournalEntry,
    chaptersRead, otRead, ntRead,
    overallPercent, otPercent, ntPercent,
    getBookProgress, getNextChapter, getRecentActivity,
    totalChapters: TOTAL_CHAPTERS,
  };
}
