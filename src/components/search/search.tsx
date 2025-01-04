import React, { useState } from 'react';
import { FamilyMember } from '../../common/types';

interface SearchProps {
  setSearchData: (key: string) => void;
  setCardLayout: (layout: 'masonry' | 'tree') => void;
}

const Search = ( {setSearchData, setCardLayout }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setSearchData(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSearchData('');
    setCardLayout('masonry');
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
        className='inline-block'
      />
      <button className='clear-all' onClick={handleClear} name='clear' type='reset' aria-label="Clear all filters">Clear all filters</button>
    </>
  );
};

export default Search;
