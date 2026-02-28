export interface BibleBook {
  name: string;
  chapters: number;
  testament: 'OT' | 'NT';
  abbrev: string;
}

export const BIBLE_BOOKS: BibleBook[] = [
  // Old Testament
  { name: "Genesis", chapters: 50, testament: "OT", abbrev: "Gen" },
  { name: "Exodus", chapters: 40, testament: "OT", abbrev: "Exod" },
  { name: "Leviticus", chapters: 27, testament: "OT", abbrev: "Lev" },
  { name: "Numbers", chapters: 36, testament: "OT", abbrev: "Num" },
  { name: "Deuteronomy", chapters: 34, testament: "OT", abbrev: "Deut" },
  { name: "Joshua", chapters: 24, testament: "OT", abbrev: "Josh" },
  { name: "Judges", chapters: 21, testament: "OT", abbrev: "Judg" },
  { name: "Ruth", chapters: 4, testament: "OT", abbrev: "Ruth" },
  { name: "1 Samuel", chapters: 31, testament: "OT", abbrev: "1Sam" },
  { name: "2 Samuel", chapters: 24, testament: "OT", abbrev: "2Sam" },
  { name: "1 Kings", chapters: 22, testament: "OT", abbrev: "1Kgs" },
  { name: "2 Kings", chapters: 25, testament: "OT", abbrev: "2Kgs" },
  { name: "1 Chronicles", chapters: 29, testament: "OT", abbrev: "1Chr" },
  { name: "2 Chronicles", chapters: 36, testament: "OT", abbrev: "2Chr" },
  { name: "Ezra", chapters: 10, testament: "OT", abbrev: "Ezra" },
  { name: "Nehemiah", chapters: 13, testament: "OT", abbrev: "Neh" },
  { name: "Esther", chapters: 10, testament: "OT", abbrev: "Esth" },
  { name: "Job", chapters: 42, testament: "OT", abbrev: "Job" },
  { name: "Psalms", chapters: 150, testament: "OT", abbrev: "Ps" },
  { name: "Proverbs", chapters: 31, testament: "OT", abbrev: "Prov" },
  { name: "Ecclesiastes", chapters: 12, testament: "OT", abbrev: "Eccl" },
  { name: "Song of Solomon", chapters: 8, testament: "OT", abbrev: "Song" },
  { name: "Isaiah", chapters: 66, testament: "OT", abbrev: "Isa" },
  { name: "Jeremiah", chapters: 52, testament: "OT", abbrev: "Jer" },
  { name: "Lamentations", chapters: 5, testament: "OT", abbrev: "Lam" },
  { name: "Ezekiel", chapters: 48, testament: "OT", abbrev: "Ezek" },
  { name: "Daniel", chapters: 12, testament: "OT", abbrev: "Dan" },
  { name: "Hosea", chapters: 14, testament: "OT", abbrev: "Hos" },
  { name: "Joel", chapters: 3, testament: "OT", abbrev: "Joel" },
  { name: "Amos", chapters: 9, testament: "OT", abbrev: "Amos" },
  { name: "Obadiah", chapters: 1, testament: "OT", abbrev: "Obad" },
  { name: "Jonah", chapters: 4, testament: "OT", abbrev: "Jonah" },
  { name: "Micah", chapters: 7, testament: "OT", abbrev: "Mic" },
  { name: "Nahum", chapters: 3, testament: "OT", abbrev: "Nah" },
  { name: "Habakkuk", chapters: 3, testament: "OT", abbrev: "Hab" },
  { name: "Zephaniah", chapters: 3, testament: "OT", abbrev: "Zeph" },
  { name: "Haggai", chapters: 2, testament: "OT", abbrev: "Hag" },
  { name: "Zechariah", chapters: 14, testament: "OT", abbrev: "Zech" },
  { name: "Malachi", chapters: 4, testament: "OT", abbrev: "Mal" },
  // New Testament
  { name: "Matthew", chapters: 28, testament: "NT", abbrev: "Matt" },
  { name: "Mark", chapters: 16, testament: "NT", abbrev: "Mark" },
  { name: "Luke", chapters: 24, testament: "NT", abbrev: "Luke" },
  { name: "John", chapters: 21, testament: "NT", abbrev: "John" },
  { name: "Acts", chapters: 28, testament: "NT", abbrev: "Acts" },
  { name: "Romans", chapters: 16, testament: "NT", abbrev: "Rom" },
  { name: "1 Corinthians", chapters: 16, testament: "NT", abbrev: "1Cor" },
  { name: "2 Corinthians", chapters: 13, testament: "NT", abbrev: "2Cor" },
  { name: "Galatians", chapters: 6, testament: "NT", abbrev: "Gal" },
  { name: "Ephesians", chapters: 6, testament: "NT", abbrev: "Eph" },
  { name: "Philippians", chapters: 4, testament: "NT", abbrev: "Phil" },
  { name: "Colossians", chapters: 4, testament: "NT", abbrev: "Col" },
  { name: "1 Thessalonians", chapters: 5, testament: "NT", abbrev: "1Thess" },
  { name: "2 Thessalonians", chapters: 3, testament: "NT", abbrev: "2Thess" },
  { name: "1 Timothy", chapters: 6, testament: "NT", abbrev: "1Tim" },
  { name: "2 Timothy", chapters: 4, testament: "NT", abbrev: "2Tim" },
  { name: "Titus", chapters: 3, testament: "NT", abbrev: "Titus" },
  { name: "Philemon", chapters: 1, testament: "NT", abbrev: "Phlm" },
  { name: "Hebrews", chapters: 13, testament: "NT", abbrev: "Heb" },
  { name: "James", chapters: 5, testament: "NT", abbrev: "Jas" },
  { name: "1 Peter", chapters: 5, testament: "NT", abbrev: "1Pet" },
  { name: "2 Peter", chapters: 3, testament: "NT", abbrev: "2Pet" },
  { name: "1 John", chapters: 5, testament: "NT", abbrev: "1John" },
  { name: "2 John", chapters: 1, testament: "NT", abbrev: "2John" },
  { name: "3 John", chapters: 1, testament: "NT", abbrev: "3John" },
  { name: "Jude", chapters: 1, testament: "NT", abbrev: "Jude" },
  { name: "Revelation", chapters: 22, testament: "NT", abbrev: "Rev" },
];

export const TOTAL_CHAPTERS = BIBLE_BOOKS.reduce((sum, b) => sum + b.chapters, 0); // 1189
export const OT_CHAPTERS = BIBLE_BOOKS.filter(b => b.testament === 'OT').reduce((sum, b) => sum + b.chapters, 0);
export const NT_CHAPTERS = BIBLE_BOOKS.filter(b => b.testament === 'NT').reduce((sum, b) => sum + b.chapters, 0);

export const COMMON_TAGS = ['faith', 'prayer', 'grace', 'repentance', 'love', 'hope', 'wisdom', 'strength', 'peace', 'joy'];

export function parsePassageInput(input: string): { book: string; chapters: number[] }[] {
  const trimmed = input.trim();
  if (!trimmed) return [];

  // Try to match book name
  const matchedBook = BIBLE_BOOKS.find(b => 
    trimmed.toLowerCase().startsWith(b.name.toLowerCase()) ||
    trimmed.toLowerCase().startsWith(b.abbrev.toLowerCase())
  );

  if (!matchedBook) return [];

  const bookNameLen = trimmed.toLowerCase().startsWith(matchedBook.name.toLowerCase())
    ? matchedBook.name.length
    : matchedBook.abbrev.length;

  const rest = trimmed.slice(bookNameLen).trim();

  if (!rest) {
    // Whole book
    return [{ book: matchedBook.name, chapters: Array.from({ length: matchedBook.chapters }, (_, i) => i + 1) }];
  }

  // Parse chapter range like "1-5" or single "3"
  const rangeMatch = rest.match(/^(\d+)\s*-\s*(\d+)$/);
  if (rangeMatch) {
    const start = Math.max(1, parseInt(rangeMatch[1]));
    const end = Math.min(matchedBook.chapters, parseInt(rangeMatch[2]));
    const chapters = [];
    for (let i = start; i <= end; i++) chapters.push(i);
    return [{ book: matchedBook.name, chapters }];
  }

  const singleMatch = rest.match(/^(\d+)$/);
  if (singleMatch) {
    const ch = parseInt(singleMatch[1]);
    if (ch >= 1 && ch <= matchedBook.chapters) {
      return [{ book: matchedBook.name, chapters: [ch] }];
    }
  }

  return [];
}

export function getMotivationalMessage(percent: number): string {
  if (percent >= 100) return "🎉 You've read the entire Bible! What an incredible journey!";
  if (percent >= 75) return "🌟 You're in the home stretch — 75% complete! Keep going!";
  if (percent >= 50) return "✨ Halfway through the Bible! Your dedication is inspiring.";
  if (percent >= 25) return "📖 A quarter of the way there. Every chapter counts!";
  if (percent > 0) return "🌱 Your journey has begun. Stay faithful, one chapter at a time.";
  return "📚 Open the Word today and begin your journey through Scripture.";
}
