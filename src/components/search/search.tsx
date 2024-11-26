import React, { useState } from 'react';
import { FamilyMember } from '../../common/types';

interface SearchProps {
  setFilteredData: (key: string) => void;
  originalData:FamilyMember[];
}

const Search = ( {setFilteredData, originalData }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setFilteredData(value); // Passes the search term to the parent to filter data
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredData('');
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
      <button onClick={handleClear} name='clear' type='reset'>Clear all</button>
    </>
  );
};

export default Search;
