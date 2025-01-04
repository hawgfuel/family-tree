import React,  { useEffect, useState } from 'react';
import { FamilyMember } from '../../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {Card} from '../card/card';
import '../card/card.css';
import './card-tree-layout.css';

export function CardTreeLayout() {
  const filteredData = useSelector((state: RootState) => state.familyTree.filteredData);
  const familyArr = [...filteredData];
  const parentArr = familyArr.slice(0, 2); 
  familyArr.splice(0, 2);

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
export default CardTreeLayout;