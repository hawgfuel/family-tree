import React from 'react';
import { FamilyMember } from '../../common/types';
import './card.css';

interface CardProps {
  filteredData: FamilyMember[];
}

export function Card({ filteredData }: CardProps) {
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

  return (
    <div className="card-container">
      {filteredData.length > 0 && filteredData.map((member) => (
        <div className="family-card" key={member.id} id={member.id}>
          <h3>
            {member.FirstName}, {member.MiddleName} {member.LastName}
          </h3>
          <ul className="card-member">
          {member.MarriedTo && (
              <li className='parent-li'
                onMouseEnter={() => {
                  if (member.MarriedTo && member.MarriedTo.id) {
                    handleMouseEnter(member.MarriedTo.id);
                  }
                }}
                onMouseLeave={() => {
                  if (member.MarriedTo && member.MarriedTo.id) {
                    handleMouseLeave(member.MarriedTo.id); 
                  }
                }}
              >
                Married to: {member.MarriedTo.FirstName} {member.MarriedTo.MiddleName} {member.MarriedTo.LastName}
              </li>
            )}
            {member.MarriageDate && <li>Marriage date: {member.MarriageDate}</li>}
            {member.BirthDate && <li>Born: {member.BirthDate}</li>}
            {member.BirthPlace && <li>Birth place: {member.BirthPlace}</li>}
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
