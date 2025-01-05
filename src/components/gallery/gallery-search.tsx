import React from 'react';

interface GallerySearchProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}

export function GallerySearch({ searchTerm, setSearchTerm }: GallerySearchProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by caption"
        value={searchTerm}
        onChange={handleSearch}
        className='inline-block'
      />
      <button
        className='clear-all'
        onClick={handleClear}
        name='clear'
        type='reset'
        aria-label="Clear gallery filter"
      >
        Clear gallery filter
      </button>
    </>
  );
}

export default GallerySearch;
