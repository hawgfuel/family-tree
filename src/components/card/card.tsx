import React from 'react';
import { FamilyMember } from '../../common/types';
import './card.css';

interface CardProps {
  filteredData: FamilyMember[];
}

export function Card({ filteredData }: CardProps) {
  const handleMouseEnter = (fatherId: string) => {
    const fatherCard = document.getElementById(fatherId);
    if (fatherCard) {
      fatherCard.classList.add('highlight'); // Add highlight class
    }
  };

  const handleMouseLeave = (fatherId: string) => {
    const fatherCard = document.getElementById(fatherId);
    if (fatherCard) {
      fatherCard.classList.remove('highlight'); // Remove highlight class
    }
  };

  return (
    <div className="card-container">
      {filteredData.length > 0 && filteredData.map((member) => (
        <div className="family-card" key={member.id} id={member.id}>
          <h3>
            {member.FirstName} {member.LastName}
          </h3>
          <ul className="card-member">
            {member.MaidenName && <li>Maiden Name: {member.MaidenName}</li>}
            {member.BirthDate && <li>Born: {member.BirthDate}</li>}
            {member.BirthPlace && <li>Birth Place: {member.BirthPlace}</li>}
            {member.DateDeath && <li>Died: {member.DateDeath}</li>}
            {member.Father && (
              <li className='parent-li'
                onMouseEnter={() => {
                  if (member.Father && member.Father.id) {
                    handleMouseEnter(member.Father.id);
                  }
                }}
                onMouseLeave={() => {
                  if (member.Father && member.Father.id) {
                    handleMouseLeave(member.Father.id); 
                  }
                }}
              >
                Father: {member.Father.FirstName} {member.Father.LastName}
              </li>
            )}
            {member.Mother && (
              <li className='parent-li'
                onMouseEnter={() => {
                  if (member.Mother && member.Mother.id) {
                    handleMouseEnter(member.Mother.id);
                  }
                }}
                onMouseLeave={() => {
                  if (member.Mother && member.Mother.id) {
                    handleMouseLeave(member.Mother.id); 
                  }
                }}
              >
                Mother: {member.Mother.FirstName} {member.Mother.LastName}
              </li>
            )}
            {member.Church && <li>Church: {member.Church}</li>}
            {member.BaptismDate && <li>Baptism Date: {member.BaptismDate}</li>}
            {member.History && <li>History: {member.History}</li>}
          </ul>
        </div>
      ))}
    </div>
  );
}
