import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import FamilyTreeTable from './family-tree-table';
import {fetchFamilyTreeData} from '../client/fetchFamilyTreeData';
import { FamilyMember } from '../common/types';
import Search from '../components/search/search';

import './main.css';

export function MainContent() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredData, setFilteredData] = useState<FamilyMember[]>([]);
  const [originalData, setOriginalData] = useState<FamilyMember[]>([]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['familyTree'],
    queryFn: fetchFamilyTreeData,
  });

  // Update filteredData when data is fetched
  useEffect(() => {
    if (data) {
        setOriginalData(data);
        setFilteredData(data);
    }
  }, [data]);

  const handleSort = (key: keyof FamilyMember) => {
    let order = sortOrder;
    if (sortKey === key) {
      order = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      order = 'asc';
    }

    // Ensure that filteredData is defined before sorting
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key] ?? ''; // Use an empty string if undefined
      const bValue = b[key] ?? ''; // Use an empty string if undefined

      if (order === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setSortKey(key);
    setSortOrder(order);
    setFilteredData(sortedData);
  };

  const handleSearch = (searchTerm: string) => {
    const filtered = originalData.filter((familiyMember) =>
        familiyMember.FirstName.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    const newData = filtered as FamilyMember[];
    setFilteredData(newData);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
        <div className='margin-bottom-sm filters'>
            <Search setFilteredData={handleSearch} originalData={originalData} />
        </div>
      <FamilyTreeTable handleSort={handleSort} filteredData={filteredData} />
    </div>
);
}
