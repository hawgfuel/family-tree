import React from 'react';
import { FamilyMember } from '../../common/types';
import {Card} from '../card/card';
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
      <Card data={filteredData} pipe={''} siblingRow={false} />
    </div>
  );
}
