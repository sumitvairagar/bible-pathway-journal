import React, { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Send, Hash, Star, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { BIBLE_BOOKS, COMMON_TAGS, parsePassageInput } from '@/data/bibleData';
import type { JournalEntry } from '@/hooks/useBibleStore';

interface ReadProps {
  progress: Record<string, boolean[]>;
  onSubmit: (entry: Omit<JournalEntry, 'id'>) => void;
  toggleChapter: (book: string, chapter: number) => void;
}

const Read: React.FC<ReadProps> = ({ progress, onSubmit, toggleChapter }) => {
  const [passageInput, setPassageInput] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [reflection, setReflection] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [verse, setVerse] = useState('');

  const parsed = useMemo(() => parsePassageInput(passageInput), [passageInput]);
  const selectedBook = parsed.length > 0 ? BIBLE_BOOKS.find(b => b.name === parsed[0].book) : null;

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleSubmit = () => {
    if (!parsed.length) return;
    const passageStr = parsed.map(p => `${p.book} ${p.chapters.length > 1 ? `${p.chapters[0]}-${p.chapters[p.chapters.length - 1]}` : p.chapters[0]}`).join(', ');
    onSubmit({
      date: format(date, 'yyyy-MM-dd'),
      passage: passageStr,
      reflection,
      tags: selectedTags,
      verse,
      chaptersRead: parsed,
    });
    // Reset
    setPassageInput('');
    setReflection('');
    setSelectedTags([]);
    setVerse('');
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-foreground">Log Reading</h1>
        <p className="text-sm text-muted-foreground mt-1">Record what you've read today</p>
      </div>

      {/* Passage input */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-1.5 block">Passage</label>
        <div className="relative">
          <BookOpen size={16} className="absolute left-3 top-3 text-muted-foreground" />
          <input
            type="text"
            value={passageInput}
            onChange={e => setPassageInput(e.target.value)}
            placeholder='e.g. "John 3", "Genesis 1-5", "Romans"'
            className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none card-shadow text-foreground placeholder:text-muted-foreground"
          />
        </div>
        {parsed.length > 0 && (
          <p className="text-xs text-success mt-1.5 font-medium">
            ✓ {parsed.map(p => `${p.book}: ${p.chapters.length} chapter${p.chapters.length > 1 ? 's' : ''}`).join(', ')}
          </p>
        )}
      </div>

      {/* Date */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-1.5 block">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className={cn("w-full justify-start text-left font-normal rounded-xl", !date && "text-muted-foreground")}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : 'Pick a date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={d => d && setDate(d)} initialFocus className="p-3 pointer-events-auto" />
          </PopoverContent>
        </Popover>
      </div>

      {/* Reflection */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-1.5 block">What did God speak to you today?</label>
        <textarea
          value={reflection}
          onChange={e => setReflection(e.target.value)}
          rows={3}
          className="w-full bg-card rounded-xl px-4 py-2.5 text-sm border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none resize-none card-shadow text-foreground placeholder:text-muted-foreground"
          placeholder="Write your reflection..."
        />
      </div>

      {/* Tags */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1">
          <Hash size={14} /> Tags
        </label>
        <div className="flex flex-wrap gap-2">
          {COMMON_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium transition-colors border',
                selectedTags.includes(tag)
                  ? 'bg-accent text-accent-foreground border-accent'
                  : 'bg-card text-muted-foreground border-border hover:border-accent'
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Favorite verse */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-1.5 flex items-center gap-1">
          <Star size={14} /> Favorite Verse
        </label>
        <input
          type="text"
          value={verse}
          onChange={e => setVerse(e.target.value)}
          placeholder="Save a key verse from your reading"
          className="w-full bg-card rounded-xl px-4 py-2.5 text-sm border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none card-shadow text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Submit */}
      <Button
        onClick={handleSubmit}
        disabled={parsed.length === 0}
        className="w-full rounded-xl h-12 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90"
      >
        <Send size={16} className="mr-2" /> Save Reading
      </Button>

      {/* Quick chapter grid */}
      {selectedBook && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-foreground mb-2">{selectedBook.name} — Chapter Grid</h3>
          <div className="grid grid-cols-8 gap-1.5">
            {Array.from({ length: selectedBook.chapters }, (_, i) => {
              const isRead = progress[selectedBook.name]?.[i] || false;
              return (
                <button
                  key={i}
                  onClick={() => toggleChapter(selectedBook.name, i + 1)}
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
        </div>
      )}
    </div>
  );
};

export default Read;
