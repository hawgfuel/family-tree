import React, { useState, useEffect, useMemo, useRef  } from 'react';
import { useQuery } from '@tanstack/react-query';
import FamilyTreeTable from '../components/table/table';
import { formatFamilyMemberData } from '../utilities/formatData';
import { Introduction } from './introduction';
import { DateRangePicker } from '../components/date-picker/date-picker';
import { CardMasonryLayout } from '../components/card-masonry-layout/card-masonry-layout';
import { CardTreeLayout } from '../components/card-tree-layout/card-tree-layout';
import {Gallery} from '../components/gallery/gallery';
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
import { getImmediateFamily } from '../utilities/generations-transform';
import {downloadCSV} from '../components/download-csv/download-csv';
import './main.css';

export function MainContent() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filteredData, setFilteredData] = useState<FamilyMember[]>([]);
  const [originalData, setOriginalData] = useState<FamilyMember[]>([]);
  const [isActive, setIsActive] = useState<string>('tab-0');
  const [selectedFamilyMember, setSelectedFamilyMember] = useState<FamilyMember | null>(null);
  const [cardLayout, setCardLayout] = useState<'masonry' | 'tree'>('masonry');
  const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
    startDate: '',
    endDate: '',
  });
  const tabContent = ['Card view', 'Table view', 'Gallery'];
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
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
    if (selectedFamilyMember) {
      const newFilteredData = getImmediateFamily(selectedFamilyMember.id, originalData);
      setFilteredData(newFilteredData);
    }
  }, [selectedFamilyMember]);

  useEffect(() => {
    if(originalData.length > 0){
      const updatedData = formatFamilyMemberData(originalData, dateRange);
      setFilteredData(updatedData);
    }
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
    if (startDateRef.current) startDateRef.current.value = '';
    if (endDateRef.current) endDateRef.current.value = '';
    setDateRange({ startDate: '', endDate: '' });
  };

  const updateDateRange = () => {
    const startDate = startDateRef.current?.value || '';
    const endDate = endDateRef.current?.value || '';
    setDateRange({ startDate, endDate });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="content-wrapper fade-in">
      <div className="content-head">
        <Introduction introductionData={introductionData} setIsActive={setIsActive} />
        <div className="filter-container">
          <h4 className="filter-header">Filters:</h4>
          <Search setFilteredData={handleSearch} setCardLayout={setCardLayout} />
          <DateRangePicker
            updateDateRange={updateDateRange}
            clearDateRange={clearDateRange}
            dateRange={dateRange}
            startDateRef={startDateRef}
            endDateRef={endDateRef}
          />
        </div>
        <div className="tab-list">
          <span role="tablist">
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
          </span>
            <span className='csv-download-container'><span>Download</span><a className='csv-download' onClick={() => downloadCSV(filteredData)}> CSV</a> of filtered or unfiltered data and save as an excel doc.</span>
            <span className='contact-me'>Contact me via email:<a className='accent-color email-link' href="mailto:alan@guicoder.com"> alan@guicoder.com</a></span>
        </div>
      </div>
      <div className='card-table'>
        {isActive === 'tab-0' &&
            <p className='filter-instructions'>Click the family member name in the card to view the immediate family tree. <br />When filtered by family, click on the father's name to see his siblings and parents.</p> 
          }
        {cardLayout=== 'masonry' && isActive === 'tab-0' &&
          <CardMasonryLayout filteredData={filteredData} setSelectedFamilyMember={setSelectedFamilyMember} setCardLayout={setCardLayout} />
        }
        { cardLayout === "tree" && isActive === 'tab-0' &&
          <CardTreeLayout filteredData={filteredData} setSelectedFamilyMember={setSelectedFamilyMember} />
        }
        {isActive === 'tab-1' && (
          <FamilyTreeTable handleSort={handleSort} filteredData={filteredData} />
        )}
        {isActive === 'tab-2' &&
            <Gallery />
          }
      </div>
    </div>
  );
}
