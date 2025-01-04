import React, {useState, useEffect} from 'react';
import { FamilyMember } from '../../common/types';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { setFilteredData } from '../../store/actions';
import { getImmediateFamily } from '../../utilities/generations-transform';
import '../card/card.css';
import './card-masonry-layout.css';

interface CardProps {
  setCardLayout: (layout: 'masonry' | 'tree') => void;
}

export function CardMasonryLayout({  setCardLayout }: CardProps) {
const dispatch = useDispatch();
const originalData = useSelector((state: RootState) => state.familyTree.originalData);
const filteredData = useSelector((state: RootState) => state.familyTree.filteredData);

  const handleMouseEnter = (id: string) => {
    const relative = document.getElementById(id);
    if (relative) {
      relative.classList.add('highlight');
    }
  };

  const handleMouseLeave = (id: string) => {
    const relative = document.getElementById(id);
    if (relative) {
      relative.classList.remove('highlight');
    }
  };

  const handleSelectFamilyMember = (member: FamilyMember) => {
    const newFilteredData = getImmediateFamily(member.id, originalData);
    dispatch(setFilteredData(newFilteredData));
    setCardLayout('tree')
  };

  return (
    <div className="card-container padding-bottom-lg fade-in">
      {filteredData.length > 0 ? (
        filteredData.map((member) => (
          <div className="member-card" key={member.id} id={member.id}>
            <h3 className='card-header'>
              {member.Father=== null &&
              <button title="Click name to see family tree" className='parent-li reset-button family-member-name no-click'>
                {member.FirstName} {member.MiddleName} {member.LastName}
              </button>
              }
              {member.Father !== null &&
              <button title="Click name to see family tree" className='parent-li reset-button family-member-name click-ancestor' onClick={() => handleSelectFamilyMember(member)}>
                {member.FirstName} {member.MiddleName} {member.LastName}
              </button>
              } 
            </h3>
            <ul className="card-member">
            {member.BirthDate && <li>Born: {member.BirthDate}</li>}
            {member.DateDeath && <li>Died: {member.DateDeath}</li>}
              
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
              {member.MarriedTo && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.MarriedTo?.id && handleMouseEnter(member.MarriedTo.id)}
                  onMouseLeave={() => member.MarriedTo?.id && handleMouseLeave(member.MarriedTo.id)}
                >
                  Married to: {member.MarriedTo.FirstName} {member.MarriedTo.MiddleName} {member.MarriedTo.LastName}
                </li>
              )}
              {member.MaidenName && <li>Maiden name: {member.MaidenName}</li>}
              {member.MarriageDate && <li>Marriage date: {member.MarriageDate}</li>}
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
