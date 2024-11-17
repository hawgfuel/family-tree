import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import FamilyTreeTable from '../components/table/family-tree-table';
import { Introduction } from './introduction';
import { CardView } from './card-view';
import { fetchFamilyTreeData } from '../client/fetchFamilyTreeData';
import { FamilyMember } from '../common/types';
import Search from '../components/search/search';
import { getMostCommonFirstName, getOldestFamilyMember, getYoungestFamilyMember } from '../utilities/utilities';
import './main.css';

export function MainContent() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredData, setFilteredData] = useState<FamilyMember[]>([]);
  const [originalData, setOriginalData] = useState<FamilyMember[]>([]);
  const [isActive, setIsActive] = useState<string>('tab-0');
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

  const handleSort = (key: keyof FamilyMember) => {
    const order = sortKey === key ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';

    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key] ?? ''; // Default to empty string
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
  };

  const introductionData = {
    totalCount: originalData.length + 1,
    mostCommonFirstName: getMostCommonFirstName(originalData) || 'unknown',
    oldestFamilyMember: getOldestFamilyMember(originalData) || defaultFamilyMember,
    youngestFamilyMember: getYoungestFamilyMember(originalData) || defaultFamilyMember,
    filteredData: filteredData,
  };

  return (
    <div className="content-wrapper">
      <div className="content-head">
        <Introduction introductionData={introductionData} />

        <div role="tablist" aria-orientation="horizontal">
          {tabContent.map((tab, index) => (
            <button
              key={index}
              className={`button-nba ${isActive === `tab-${index}` ? 'isActive' : ''}`}
              role="tab"
              type="button"
              aria-selected={isActive === `tab-${index}` ? 'true' : 'false'}
              id={`tab-${index}`}
              onClick={() => setIsActive(`tab-${index}`)}
            >
              {tab}
            </button>
          ))}
          <Search setFilteredData={handleSearch} originalData={originalData} />
        </div>
      </div>

      {isActive === 'tab-0' && <CardView filteredData={filteredData} />}
      {isActive === 'tab-1' && <FamilyTreeTable handleSort={handleSort} filteredData={filteredData} />}
    </div>
  );
}
