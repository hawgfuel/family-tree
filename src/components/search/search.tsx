import React, { useState } from 'react';
import { FamilyMember } from '../../common/types';

interface SearchProps {
  setFilteredData: (key: string) => void;
  setCardLayout: (layout: 'masonry' | 'tree') => void;
}

const Search = ( {setFilteredData, setCardLayout }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredData(value); // Passes the search term to the parent to filter data
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredData('');
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
      <button className='clear-all' onClick={handleClear} name='clear' type='reset'>Clear all</button>
    </>
  );
};

export default Search;
