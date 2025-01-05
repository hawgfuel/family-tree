import React, {useState, useEffect, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilteredData } from '../../store/actions';
import { formatFamilyMemberData } from '../../utilities/formatData';
import './calendar.css';

interface DateRangePickerProps {
  dateRange: { startDate: string; endDate: string };  // Current date range state
  startDateRef: React.RefObject<HTMLInputElement>;  // Ref for start date input
  endDateRef: React.RefObject<HTMLInputElement>;    // Ref for end date input
}

export const DateRangePicker = React.memo(function DateRangePicker() {

  const dispatch = useDispatch();
  const originalData = useSelector((state: RootState) => state.familyTree.originalData);
  const startDateRef = useRef<HTMLInputElement | null>(null);
  const endDateRef = useRef<HTMLInputElement | null>(null);
    const [dateRange, setDateRange] = useState<{ startDate: string; endDate: string }>({
      startDate: '',
      endDate: '',
    });
    
  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Use refs to get the values directly without relying on DOM queries
    const startDateInput = startDateRef.current?.value;
    const endDateInput = endDateRef.current?.value;

    if (startDateInput && endDateInput) {
      updateDateRange(startDateInput, endDateInput);  // Update the date range state
    }
  };
  
  useEffect(() => {
    if(originalData.length > 0){
      const updatedData = formatFamilyMemberData(originalData, dateRange);
      dispatch(setFilteredData(updatedData));
    }
  }, [originalData, dateRange]);
  
  // move to date component
  const clearDateRange = () => {
    if (startDateRef.current) startDateRef.current.value = '';
    if (endDateRef.current) endDateRef.current.value = '';
    setDateRange({ startDate: '', endDate: '' });
  };

  const updateDateRange = (startDateInput?: string, endDateInput?: string) => {
    const startDate = startDateRef.current?.value || '';
    const endDate = endDateRef.current?.value || '';
    setDateRange({ startDate, endDate });
  };
// end move
  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearDateRange();  // Clear the date range
  };

  return (
    <span className="date-range-DateRangePicker">
      <form className="date-picker-form">
        <label className="filter-label">
          Start Date:
          <input
            className="date-range-input"
            type="date"
            id="startDate"
            ref={startDateRef}
            defaultValue={dateRange.startDate}
          />
        </label>
        <label className="filter-label">
          End Date:
          <input
            className="date-range-input"
            type="date"
            id="endDate"
            ref={endDateRef}
            defaultValue={dateRange.endDate}
          />
        </label>
        <button className='set-range-Button' onClick={handleFilterClick}>Filter date range</button>
        <button className='clear-range-Button' onClick={handleClearClick} type="reset">Clear date range</button>
      </form>
    </span>
  );
});
