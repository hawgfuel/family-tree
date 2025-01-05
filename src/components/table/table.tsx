import React, {useState} from 'react';
import { FamilyMember } from '../../common/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilteredData } from '../../store/actions';
import  './table.css';

function FamilyTreeTable() {
  const dispatch = useDispatch();
  const filteredData = useSelector((state: RootState) => state.familyTree.filteredData);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const getFormattedParentName = (parent: any) => {
    if (parent && typeof parent === 'object') {
      return `${parent.FirstName || ''} ${parent.LastName || ''}`.trim() || '';
    }
    return parent ? parent : 'unknown';
  };

// table component sort
  const handleSort = (key: keyof FamilyMember) => {
    const order = sortKey === key ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
    const sortedData = [...filteredData].sort((a, b) => {
      const aValue = a[key] ?? '';
      const bValue = b[key] ?? '';
      return order === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
    setSortKey(key);
    setSortOrder(order);
    dispatch(setFilteredData(sortedData));
  };

  return (
    <div className='fade-in'>
    <div className='showHorizontalLabel'>Scroll horizontally {'>>'}</div>
    <table className="fl-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('FirstName')}>First Name</th>
          <th onClick={() => handleSort('LastName')}>Last Name</th>
          <th onClick={() => handleSort('MiddleName')}>Middle Name</th>
          <th onClick={() => handleSort('BirthDate')}>Birth Date</th>
          <th onClick={() => handleSort('BirthPlace')}>Birth Place</th>
          <th onClick={() => handleSort('Church')}>Church</th>
          <th onClick={() => handleSort('BaptismDate')}>Baptism Date</th>
          <th onClick={() => handleSort('MarriageDate')}>Marriage Date</th>
          <th onClick={() => handleSort('Father')}>Father</th>
          <th onClick={() => handleSort('Mother')}>Mother</th>
          <th onClick={() => handleSort('History')}>History</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((member: FamilyMember, index: number) => (
          <tr key={index}>
            <td>{member.FirstName}</td>
            <td>{member.LastName}</td>
            <td>{member.MiddleName}</td>
            <td>
              {isNaN(new Date(member.BirthDate).getTime())
                ? ''
                : `${new Date(member.BirthDate).getMonth() + 1}/${new Date(
                    member.BirthDate
                  ).getDate()}/${new Date(member.BirthDate).getFullYear()}`}
            </td>
            <td>{member.BirthPlace}</td>
            <td>{member.Church}</td>
            <td>{member.BaptismDate}</td>
            <td>{member.MarriageDate}</td>
            <td>{getFormattedParentName(member.Father)}</td>
            <td>{getFormattedParentName(member.Mother)}</td>
            <td>{member.History}</td>
          </tr>
        ))}
        <tr><td>(end of table)</td></tr>
      </tbody>
    </table>
    </div>
  );
}

export default FamilyTreeTable;
