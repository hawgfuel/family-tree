import React, { useState, useEffect, useRef, Suspense  } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setFilteredData } from '../store/actions';
import { Introduction } from '../components/introduction/introduction';
import { DateRangePicker } from '../components/date-picker/date-picker';
import { CardMasonryLayout } from '../components/card-masonry-layout/card-masonry-layout';
import {CardTreeLayout} from '../components/card-tree-layout/card-tree-layout';
import FamilyTreeTable from '../components/table/table';
import {Gallery} from '../components/gallery/gallery';
import Search from '../components/search/search';
import {downloadCSV} from '../components/download-csv/download-csv';
import '../styles/main.css';


export function MainContent() {
  const dispatch = useDispatch();
  const originalData = useSelector((state: RootState) => state.familyTree.originalData);
  const filteredData = useSelector((state: RootState) => state.familyTree.filteredData);
  const [isActive, setIsActive] = useState<string>('tab-0');
  const contentRef = useRef<HTMLDivElement>(null);
  const [cardLayout, setCardLayout] = useState<'masonry' | 'tree'>('masonry');
  const tabContent = ['Card view', 'Table view', 'Gallery'];
  
// seach component data filter
  const handleSearch = (searchTerm: string) => {
    const filtered = originalData.filter((familyMember) =>
      familyMember.FirstName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setFilteredData(filtered));
  };

  return (
    <div className="content-wrapper fade-in">
      <div className="content-head">
        <Introduction setIsActive={setIsActive} contentRef={contentRef} isActive={isActive} />
        {isActive !== 'tab-2' &&
        <div className="filter-container">
          <h4 className="filter-header">Filters:</h4>
          <Search setSearchData={handleSearch} setCardLayout={setCardLayout} />
          <DateRangePicker />
        </div>
}
        <div className="tab-list" id="content" ref={contentRef}>
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
            <p className='filter-instructions'>Click the family member name in the card to view the immediate family tree. 
            <br />When filtered by family, click on the father's name to see his siblings and parents.</p> 
          }
        {cardLayout=== 'masonry' && isActive === 'tab-0' &&
          <CardMasonryLayout setCardLayout={setCardLayout} />
        }
        { cardLayout === "tree" && isActive === 'tab-0' &&
        <Suspense fallback={<div>Loading...</div>}>
          <CardTreeLayout />
        </Suspense>
        }
        {isActive === 'tab-1' && (
            <FamilyTreeTable />
        )}
        {isActive === 'tab-2' &&
          <Gallery />
        }
      </div>
    </div>
  );
}
