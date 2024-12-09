import React,  { useEffect } from 'react';
import { FamilyMember } from '../../common/types';
import {Card} from '../card/card';
import '../card/card.css';
import './card-tree-layout.css';

interface CardProps {
  filteredData: FamilyMember[];
  setSelectedFamilyMember: (selected: FamilyMember) => void;
}

export function CardTreeLayout({ filteredData, setSelectedFamilyMember }: CardProps) {

console.log(filteredData);
  const handleMouseEnter = (id: string) => {
    const relative = document.getElementById(id);
    if (relative) {
      relative.classList.add('highlight'); // Add highlight class
    }
  };

  const familyArr = [...filteredData];
  const parentArr = familyArr.slice(0, 2); 
  familyArr.splice(0, 2);

  useEffect(() => { 
    if (familyArr) {
        const siblingBorder = document.getElementById('siblingBorder') as HTMLElement | null;
        const newWidth = familyArr.length * 200;
        if (siblingBorder) {
            siblingBorder.style.width = `${newWidth}px`;
        }
    }
}, [familyArr]);

  return (
    <div className='fade-in'>
        <div className='card-tree-container card-tree-row'>
            <Card data={parentArr} pipe={'card-pipe-bottom'} siblingRow={false} />
        </div>
        {familyArr && (
            <div className='sibling-border-container'>
                <div id="siblingBorder" className="border-top">&nbsp;</div>
            </div>    
        )
        }
        <div className='siblings card-tree-row bottom padding-bottom-lg'>
            <Card data={familyArr}  pipe={'card-pipe-top'} siblingRow={true} />
        </div>
    </div>
  );
}
