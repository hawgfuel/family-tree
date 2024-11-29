import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import FamilyTreeTable from '../components/table/table';
import { Introduction } from './introduction';
import { Card } from '../components/card/card';
import { fetchFamilyTreeData } from '../client/fetchFamilyTreeData';
import { FamilyMember } from '../common/types';
import Search from '../components/search/search';
import { getFamilyTimeSpan, getMostCommonSurname, getMostCommonFirstNameByGender, getOldestFamilyMember, getYoungestFamilyMember} from '../utilities/utilities';
import {filterByGenerations} from '../utilities/generations-transform';
import './main.css';

export function MainContent() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredData, setFilteredData] = useState<FamilyMember[]>([]);
  const [originalData, setOriginalData] = useState<FamilyMember[]>([]);
  const [isActive, setIsActive] = useState<string>('tab-0');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);
  const [generationFilter, setGenerationFilter] = useState<number>(1); // Track number of generations
  const [rootMemberId, setRootMemberId] = useState<string>("");

  const tabContent = ['Card view', 'Table view'];

  const { data, isLoading, error } = useQuery({
    queryKey: ['familyTree'],
    queryFn: fetchFamilyTreeData,
  });

  useEffect(() => {
    if (data) {
      setOriginalData(data);
      setFilteredData(data);
    }
  }, [data]);

  useEffect(() => {
    if (data && rootMemberId) {
      const newfilteredData = filterByGenerations(rootMemberId, filteredData, generationFilter); // Example: 2 generations
      console.log(newfilteredData); // Use this in your component or logic.
      setFilteredData(newfilteredData)
    }
  }, [rootMemberId]);

  useEffect(() => {
    if (selectedFamilyMember) {
      setRootMemberId(selectedFamilyMember.id);
    }
  }, [selectedFamilyMember]);

  const handleSort = (key: keyof FamilyMember) => {
    const order = sortKey === key ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';

      return order === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });

    setSortKey(key);
    setSortOrder(order);
    setFilteredData(sortedData);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = originalData.filter((familyMember) =>
      familyMember.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const defaultFamilyMember: FamilyMember = {
    FirstName: 'Unknown',
    LastName: '',
    BirthDate: '',
    BirthPlace: '',
    id: '',
    Mother: null,
    Father: null,
    History:'',
    Children: [{child:'', id:''}],
  };

  const introductionData = {
    totalCount: originalData.length,
    mostCommonMaleFirstName: getMostCommonFirstNameByGender(originalData, 'male') || 'unknown',
    mostCommonFemaleFirstName: getMostCommonFirstNameByGender(originalData, 'female') || 'unknown',
    mostCommonSurname: getMostCommonSurname(originalData) || '',
    oldestFamilyMember: getOldestFamilyMember(originalData) || defaultFamilyMember,
    youngestFamilyMember: getYoungestFamilyMember(originalData) || defaultFamilyMember,
    familyTimeSpan: getFamilyTimeSpan(originalData) || 0,
    filteredData: filteredData,
  }

  return (
    <div className="content-wrapper">
      <div className="content-head">
        {originalData && 
          <Introduction introductionData={introductionData} />
        }
        <div className='tab-list' role="tablist" aria-orientation="horizontal">
            {tabContent.map((tab, index) => (
              <button
                key={index}
                className={`button-pivot ${isActive === `tab-${index}` ? 'isActive' : ''}`}
                role="tab"
                type="button"
                aria-selected={isActive === `tab-${index}` ? 'true' : 'false'}
                id={`tab-${index}`}
                onClick={() => setIsActive(`tab-${index}`)}
              >
                {tab}
              </button>
            ))}
            <h4 className='filter-header'>Filters: </h4>
          <Search setFilteredData={handleSearch} originalData={originalData} />
          <span className='generations-filter'>
            <label htmlFor="filter-label">Narrow tree by:</label>
            <select
              id="generationFilter"
              value={generationFilter}
              onChange={(e) => setGenerationFilter(Number(e.target.value))}
            >
              <option value={1}>1 Generation</option>
              <option value={2}>2 Generations</option>
            </select>
          </span>
      </div>
      {isActive === 'tab-0' && (
        <Card
          filteredData={filteredData}
          setSelectedFamilyMember={setSelectedFamilyMember}
        />
      )}
      {isActive === 'tab-1' && (
        <FamilyTreeTable handleSort={handleSort} filteredData={filteredData} />
      )}
      </div>
    </div>
  );
}
