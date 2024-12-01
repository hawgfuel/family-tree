import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import FamilyTreeTable from '../components/table/table';
import { formatFamilyMemberData } from '../utilities/formatData';
import { Introduction } from './introduction';
import { DateRangePicker } from '../components/date-picker/date-picker';
import { Card } from '../components/card/card';
import { fetchFamilyTreeData } from '../client/fetchFamilyTreeData';
import { FamilyMember } from '../common/types';
import { defaultFamilyMember } from '../constants/constants';
import Search from '../components/search/search';
import {
  getFamilyTimeSpan,
  getMostCommonSurname,
  getMostCommonFirstNameByGender,
  getOldestFamilyMember,
  getYoungestFamilyMember,
} from '../utilities/utilities';
import { filterByGenerations } from '../utilities/generations-transform';
import './main.css';

export function MainContent() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredData, setFilteredData] = useState<FamilyMember[]>([]);
  const [originalData, setOriginalData] = useState<FamilyMember[]>([]);
  const [isActive, setIsActive] = useState<string>('tab-0');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);
  const [generationFilter, setGenerationFilter] = useState<number>(1);
  const [rootMemberId, setRootMemberId] = useState<string>('');
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });
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
      const newFilteredData = filterByGenerations(rootMemberId, filteredData, generationFilter);
      setFilteredData(newFilteredData);
    }
  }, [rootMemberId, generationFilter]);

  useEffect(() => {
    if (selectedFamilyMember) {
      setRootMemberId(selectedFamilyMember.id);
    }
  }, [selectedFamilyMember]);

  useEffect(() => {
    const updatedData = formatFamilyMemberData(originalData, dateRange);
    setFilteredData(updatedData);
  }, [originalData, dateRange]);

  const introductionData = useMemo(() => {
    return {
      totalCount: filteredData.length,
      mostCommonMaleFirstName: getMostCommonFirstNameByGender(filteredData, 'male') || 'unknown',
      mostCommonFemaleFirstName: getMostCommonFirstNameByGender(filteredData, 'female') || 'unknown',
      mostCommonSurname: getMostCommonSurname(filteredData) || '',
      oldestFamilyMember: getOldestFamilyMember(filteredData) || defaultFamilyMember,
      youngestFamilyMember: getYoungestFamilyMember(filteredData) || defaultFamilyMember,
      familyTimeSpan: getFamilyTimeSpan(filteredData) || 0,
      filteredData: filteredData,
    };
  }, [originalData, filteredData]);

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

  const clearDateRange = () => {
    setDateRange({ startDate: '', endDate: '' });
  };

  const updateDateRange = (startDate: string, endDate: string) => {
    setDateRange({ startDate, endDate });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="content-wrapper">
      <div className="content-head">
        <Introduction introductionData={introductionData} />
        <div className="filter-container">
          <h4 className="filter-header">Filters:</h4>
          <Search setFilteredData={handleSearch} originalData={originalData} />
          <span className="filter-block">
            <label className="filter-label" htmlFor="filter-label">
              Narrow tree by:
            </label>
            <select
              id="generationFilter"
              value={generationFilter}
              onChange={(e) => setGenerationFilter(Number(e.target.value))}
            >
              <option value={1}>1 Generation</option>
              <option value={2}>2 Generations</option>
            </select>
          </span>
          <DateRangePicker
            updateDateRange={updateDateRange}
            clearDateRange={clearDateRange}
            dateRange={dateRange}
          />
        </div>
        <div className="tab-list" role="tablist" aria-orientation="horizontal">
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
        </div>
      </div>
      {isActive === 'tab-0' && (
        <Card filteredData={filteredData} setSelectedFamilyMember={setSelectedFamilyMember} />
      )}
      {isActive === 'tab-1' && (
        <FamilyTreeTable handleSort={handleSort} filteredData={filteredData} />
      )}
    </div>
  );
}
