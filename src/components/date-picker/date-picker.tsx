import React from 'react';
import './calendar.css';

interface DateRangePickerProps {
  updateDateRange: (startDate: string, endDate: string) => void;  // Function to update the date range based on the input values
  clearDateRange: () => void;   // Function to clear the date range and input fields
  dateRange: { startDate: string; endDate: string };  // Current date range state
  startDateRef: React.RefObject<HTMLInputElement>;  // Ref for start date input
  endDateRef: React.RefObject<HTMLInputElement>;    // Ref for end date input
}

export function DateRangePicker({ 
  updateDateRange,
  clearDateRange,
  dateRange,
  startDateRef,
  endDateRef 
}: DateRangePickerProps) {

  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Use refs to get the values directly without relying on DOM queries
    const startDateInput = startDateRef.current?.value;
    const endDateInput = endDateRef.current?.value;

    if (startDateInput && endDateInput) {
      updateDateRange(startDateInput, endDateInput);  // Update the date range state
    }
  };

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
}
