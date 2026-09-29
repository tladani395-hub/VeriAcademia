'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [activeTab, setActiveTab] = useState<'Publications' | 'Researchers' | 'Universities' | 'Patents'>('Publications');
  const [query, setQuery] = useState('');
  const router = useRouter();

  const placeholders = {
    Publications: 'Search by title, author, DOI or keyword',
    Researchers: 'Search by name, interest or university',
    Universities: 'Search by name, city or country',
    Patents: 'Search by title, inventor or patent number',
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const targetRoute = activeTab.toLowerCase();
    router.push(`/${targetRoute}?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="search">
      <div className="tabs" role="tablist" aria-label="Search category">
        {(['Publications', 'Researchers', 'Universities', 'Patents'] as const).map((tab) => (
          <button
            key={tab}
            role="tab"
            type="button"
            aria-selected={activeTab === tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <form className="sbar" role="search" onSubmit={handleSearch}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholders[activeTab]}
          aria-label={`Search ${activeTab}`}
        />
        <button className="btn primary" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}
