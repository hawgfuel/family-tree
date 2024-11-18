import React from 'react';
import PropTypes from 'prop-types';
import { FamilyMember } from '../../common/types';

interface TableProps {
  filteredData: FamilyMember[];
  handleSort: (key: keyof FamilyMember) => void;
}

function FamilyTreeTable({ filteredData, handleSort }: TableProps) {
  const getFormattedParentName = (parent: any) => {
    // If the parent is an object with FirstName and LastName, return them
    if (parent && typeof parent === 'object') {
      return `${parent.FirstName || ''} ${parent.LastName || ''}`.trim() || '';
    }
    return parent ? parent : 'unknown';
  };

  return (
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
          <th onClick={() => handleSort('MilitaryService')}>Military Service</th>
          <th onClick={() => handleSort('Occupation')}>Occupation</th>
          <th onClick={() => handleSort('Education')}>Education</th>
          <th onClick={() => handleSort('Father')}>Father</th>
          <th onClick={() => handleSort('Mother')}>Mother</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((member, index) => (
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
            <td>{member.MilitaryService}</td>
            <td>{member.Occupation}</td>
            <td>{member.Education}</td>
            <td>{getFormattedParentName(member.Father)}</td>
            <td>{getFormattedParentName(member.Mother)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

FamilyTreeTable.propTypes = {
  filteredData: PropTypes.arrayOf(
    PropTypes.shape({
      FirstName: PropTypes.string.isRequired,
      LastName: PropTypes.string.isRequired,
      MiddleName: PropTypes.string,
      BirthDate: PropTypes.string,
      BirthPlace: PropTypes.string,
      Church: PropTypes.string,
      BaptismDate: PropTypes.string,
      MarriageDate: PropTypes.string,
      MilitaryService: PropTypes.string,
      Occupation: PropTypes.string,
      Education: PropTypes.string,
      Father: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      Mother: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    })
  ).isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default FamilyTreeTable;
