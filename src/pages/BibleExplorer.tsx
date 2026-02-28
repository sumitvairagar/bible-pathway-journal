import React, { useState } from 'react';
import { BIBLE_BOOKS } from '@/data/bibleData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import ProgressRing from '@/components/ProgressRing';
import type { JournalEntry } from '@/hooks/useBibleStore';

interface BibleExplorerProps {
  progress: Record<string, boolean[]>;
  getBookProgress: (name: string) => { read: number; total: number; percent: number };
  toggleChapter: (book: string, chapter: number) => void;
  journal: JournalEntry[];
}

const BibleExplorer: React.FC<BibleExplorerProps> = ({ progress, getBookProgress, toggleChapter, journal }) => {
  const [testament, setTestament] = useState<'OT' | 'NT'>('OT');
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  const books = BIBLE_BOOKS.filter(b => b.testament === testament);
  const selectedBookData = BIBLE_BOOKS.find(b => b.name === selectedBook);
  const selectedProgress = selectedBook ? getBookProgress(selectedBook) : null;
  const bookJournal = journal.filter(e => e.chaptersRead.some(c => c.book === selectedBook));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-foreground">Bible Explorer</h1>
      </div>

      {/* Toggle */}
      <div className="flex bg-muted rounded-xl p-1">
        {(['OT', 'NT'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTestament(t)}
            className={cn(
              'flex-1 py-2 text-sm font-semibold rounded-lg transition-colors',
              testament === t ? 'bg-card text-foreground card-shadow' : 'text-muted-foreground'
            )}
          >
            {t === 'OT' ? 'Old Testament' : 'New Testament'}
          </button>
        ))}
      </div>

      {/* Book grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {books.map(book => {
          const bp = getBookProgress(book.name);
          return (
            <button
              key={book.name}
              onClick={() => setSelectedBook(book.name)}
              className="bg-card rounded-xl p-3 text-left card-shadow hover:ring-2 hover:ring-accent/50 transition-all"
            >
              <p className="text-xs font-bold text-foreground truncate">{book.name}</p>
              <div className="w-full h-1.5 bg-muted rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${bp.percent}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{bp.read}/{bp.total} · {bp.percent}%</p>
            </button>
          );
        })}
      </div>

      {/* Book modal */}
      {selectedBook && selectedBookData && selectedProgress && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/30" onClick={() => setSelectedBook(null)}>
          <div
            className="bg-card w-full max-w-[430px] rounded-t-3xl p-5 max-h-[80vh] overflow-y-auto animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />
            <div className="flex items-center gap-4 mb-4">
              <ProgressRing percent={selectedProgress.percent} size={70} strokeWidth={6} />
              <div>
                <h2 className="text-lg font-bold text-foreground">{selectedBook}</h2>
                <p className="text-sm text-muted-foreground">{selectedProgress.read} of {selectedProgress.total} chapters</p>
              </div>
            </div>

            <h3 className="text-sm font-semibold text-foreground mb-2">Chapters</h3>
            <div className="grid grid-cols-8 gap-1.5 mb-4">
              {Array.from({ length: selectedBookData.chapters }, (_, i) => {
                const isRead = progress[selectedBook]?.[i] || false;
                return (
                  <button
                    key={i}
                    onClick={() => toggleChapter(selectedBook, i + 1)}
                    className={cn(
                      'aspect-square rounded-lg text-xs font-semibold transition-colors flex items-center justify-center',
                      isRead
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-accent/20'
                    )}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {bookJournal.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">Journal Entries</h3>
                <div className="space-y-2">
                  {bookJournal.slice(0, 5).map(entry => (
                    <div key={entry.id} className="bg-muted/50 rounded-lg p-2.5">
                      <div className="flex justify-between">
                        <span className="text-xs font-semibold text-foreground">{entry.passage}</span>
                        <span className="text-[10px] text-muted-foreground">{entry.date}</span>
                      </div>
                      {entry.reflection && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.reflection}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <Button onClick={() => setSelectedBook(null)} className="w-full mt-4 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleExplorer;
