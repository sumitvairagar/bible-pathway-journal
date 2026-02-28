import React, { useState, useMemo } from 'react';
import { Search, Tag, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COMMON_TAGS } from '@/data/bibleData';
import type { JournalEntry } from '@/hooks/useBibleStore';

interface JournalProps {
  journal: JournalEntry[];
}

const Journal: React.FC<JournalProps> = ({ journal }) => {
  const [search, setSearch] = useState('');
  const [filterTag, setFilterTag] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return journal.filter(entry => {
      const matchesSearch = !search || 
        entry.passage.toLowerCase().includes(search.toLowerCase()) ||
        entry.reflection.toLowerCase().includes(search.toLowerCase()) ||
        entry.verse.toLowerCase().includes(search.toLowerCase());
      const matchesTag = !filterTag || entry.tags.includes(filterTag);
      return matchesSearch && matchesTag;
    });
  }, [journal, search, filterTag]);

  const usedTags = useMemo(() => {
    const tags = new Set<string>();
    journal.forEach(e => e.tags.forEach(t => tags.add(t)));
    return Array.from(tags);
  }, [journal]);

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-foreground">Journal</h1>
        <p className="text-sm text-muted-foreground mt-1">{journal.length} entries</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-2.5 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search passages or reflections..."
          className="w-full bg-card rounded-xl pl-9 pr-4 py-2.5 text-sm border border-border focus:ring-2 focus:ring-accent focus:border-transparent outline-none card-shadow text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Tag filters */}
      {usedTags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setFilterTag(null)}
            className={cn(
              'px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors',
              !filterTag ? 'bg-accent text-accent-foreground border-accent' : 'bg-card text-muted-foreground border-border'
            )}
          >
            All
          </button>
          {usedTags.map(tag => (
            <button
              key={tag}
              onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={cn(
                'px-2.5 py-1 rounded-full text-[11px] font-medium border transition-colors',
                filterTag === tag ? 'bg-accent text-accent-foreground border-accent' : 'bg-card text-muted-foreground border-border'
              )}
            >
              #{tag}
            </button>
          ))}
        </div>
      )}

      {/* Entries */}
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Tag size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-sm text-muted-foreground">
            {journal.length === 0 ? 'No journal entries yet. Start reading!' : 'No matching entries found.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map(entry => {
            const isExpanded = expandedId === entry.id;
            return (
              <button
                key={entry.id}
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className="w-full text-left bg-card rounded-xl p-3.5 card-shadow transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-foreground">{entry.passage}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">{entry.date}</span>
                    {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                  </div>
                </div>

                {!isExpanded && entry.reflection && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{entry.reflection}</p>
                )}

                {isExpanded && (
                  <div className="mt-3 space-y-2.5 animate-fade-in">
                    {entry.reflection && (
                      <div>
                        <p className="text-[11px] font-semibold text-muted-foreground mb-0.5">Reflection</p>
                        <p className="text-sm text-foreground leading-relaxed">{entry.reflection}</p>
                      </div>
                    )}
                    {entry.verse && (
                      <div className="flex items-start gap-1.5">
                        <Star size={12} className="text-accent mt-0.5 shrink-0" />
                        <p className="text-sm text-foreground italic">"{entry.verse}"</p>
                      </div>
                    )}
                    {entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-accent/10 text-accent">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Journal;
