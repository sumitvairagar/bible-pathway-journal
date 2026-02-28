import React from 'react';
import { Home, BookOpen, Library, NotebookPen } from 'lucide-react';

interface BottomTabsProps {
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const tabs = [
  { icon: Home, label: 'Home' },
  { icon: BookOpen, label: 'Read' },
  { icon: Library, label: 'Bible' },
  { icon: NotebookPen, label: 'Journal' },
];

const BottomTabs: React.FC<BottomTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="mx-auto max-w-[430px] flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map((tab, i) => {
          const Icon = tab.icon;
          const isActive = activeTab === i;
          return (
            <button
              key={tab.label}
              onClick={() => onTabChange(i)}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 transition-colors ${
                isActive ? 'text-accent' : 'text-muted-foreground'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[11px] font-medium">{tab.label}</span>
              {isActive && (
                <div className="absolute top-0 w-8 h-0.5 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabs;
