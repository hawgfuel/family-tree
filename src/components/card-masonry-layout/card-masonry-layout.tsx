import React from 'react';
import { FamilyMember } from '../../common/types';
import './card-masonry-layout.css';

interface CardProps {
  filteredData: FamilyMember[];
  setSelectedFamilyMember: (selected: FamilyMember) => void;
  setCardLayout: (layout: 'masonry' | 'tree') => void;
}

export function CardMasonryLayout({ filteredData, setSelectedFamilyMember, setCardLayout }: CardProps) {

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
    setCardLayout('tree')
  };

  return (
    <div className="card-container padding-bottom-lg">
      {filteredData.length > 0 ? (
        filteredData.map((member) => (
          <div className="masonry-card" key={member.id} id={member.id}>
            <h3>
              <button title="Click name to see family tree" className='parent-li reset-button family-member-name' onClick={() => handleSelectFamilyMember(member)}>
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
                  Father: {member.Father.FirstName} {member.Father.MiddleName} {member.Father.LastName}
                </li>
              )}
              {member.Mother && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.Mother?.id && handleMouseEnter(member.Mother.id)}
                  onMouseLeave={() => member.Mother?.id && handleMouseLeave(member.Mother.id)}
                >
                  Mother: {member.Mother.FirstName} {member.Mother.MiddleName} {member.Mother.LastName}
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
