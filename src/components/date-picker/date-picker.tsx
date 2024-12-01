import React from 'react';
import './calendar.css';

interface DateRangePickerProps {
  updateDateRange: (startDate: string, endDate: string) => void;
  clearDateRange: () => void;
  dateRange: { startDate: string; endDate: string };
}

export function DateRangePicker({ updateDateRange, clearDateRange, dateRange }: DateRangePickerProps) {
  const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const startDateInput = (document.getElementById('startDate') as HTMLInputElement).value;
    const endDateInput = (document.getElementById('endDate') as HTMLInputElement).value;
    updateDateRange(startDateInput, endDateInput);
  };

  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    clearDateRange();
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
            defaultValue={dateRange.startDate}
          />
        </label>
        <label className="filter-label">
          End Date:
          <input
            className="date-range-input"
            type="date"
            id="endDate"
            defaultValue={dateRange.endDate}
          />
        </label>
        <button className='set-range-Button' onClick={handleFilterClick}>Filter date range</button>
        <button className='clear-range-Button' onClick={handleClearClick}>Clear date range</button>
      </form>
    </span>
  );
}
