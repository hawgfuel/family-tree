import React from 'react';
import { FamilyMember } from '../../common/types';
import './card.css';

interface CardProps {
  filteredData: FamilyMember[];
  setSelectedFamilyMember: (selected: FamilyMember) => void;
}

export function Card({ filteredData, setSelectedFamilyMember }: CardProps) {
  const handleMouseEnter = (id: string) => {
    const relative = document.getElementById(id);
    if (relative) {
      relative.classList.add('highlight'); // Add highlight class
    }
  };

  const handleMouseLeave = (id: string) => {
    const relative = document.getElementById(id);
    if (relative) {
      relative.classList.remove('highlight'); // Remove highlight class
    }
  };

  const handleSelectFamilyMember = (member: FamilyMember) => {
    setSelectedFamilyMember(member);
  };

  return (
    <div className="card-container">
      {filteredData.length > 0 ? (
        filteredData.map((member) => (
          <div className="family-card" key={member.id} id={member.id}>
            <h3>
              <button className='parent-li reset-button' onClick={() => handleSelectFamilyMember(member)}>
                {member.FirstName} {member.MiddleName} {member.LastName}
              </button>
            </h3>
            <ul className="card-member">
            {member.BirthDate && <li>Born: {member.BirthDate}</li>}
            {member.DateDeath && <li>Died: {member.DateDeath}</li>}
              {member.MarriedTo && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.MarriedTo?.id && handleMouseEnter(member.MarriedTo.id)}
                  onMouseLeave={() => member.MarriedTo?.id && handleMouseLeave(member.MarriedTo.id)}
                >
                  Married to: {member.MarriedTo.FirstName} {member.MarriedTo.MiddleName} {member.MarriedTo.LastName}
                </li>
              )}
              {member.MarriageDate && <li>Marriage date: {member.MarriageDate}</li>}
              {member.Father && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.Father?.id && handleMouseEnter(member.Father.id)}
                  onMouseLeave={() => member.Father?.id && handleMouseLeave(member.Father.id)}
                >
                  Father: {member.Father.FirstName} {member.Father.LastName}
                </li>
              )}
              {member.Mother && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.Mother?.id && handleMouseEnter(member.Mother.id)}
                  onMouseLeave={() => member.Mother?.id && handleMouseLeave(member.Mother.id)}
                >
                  Mother: {member.Mother.FirstName} {member.Mother.LastName}
                </li>
              )}
              {member.Church && <li>Church: {member.Church}</li>}
              {member.BaptismDate && <li>Baptism Date: {member.BaptismDate}</li>}
              {/* {member.History && <li>History: {member.History}</li>} */}
            </ul>
          </div>
        ))
      ) : (
        <p>No family members match the search criteria.</p>
      )}
    </div>
  );
}
