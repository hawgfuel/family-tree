import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../common/types';
import './introduction.css';

interface IntroductionProps {
    introductionData: {
        totalCount: number;
        mostCommonMaleFirstName: string;
        mostCommonFemaleFirstName: string;
        mostCommonSurname:string;
        oldestFamilyMember: FamilyMember;
        youngestFamilyMember: FamilyMember;
        familyTimeSpan:number;
    };
  }
  
  export function Introduction({ introductionData }: IntroductionProps) {
    const {
    totalCount,
    mostCommonMaleFirstName,
    mostCommonFemaleFirstName,
    mostCommonSurname,
      oldestFamilyMember,
      youngestFamilyMember,
      familyTimeSpan,
    } = introductionData;
 
    return (
        <div className='introduction'>
            <h1>Werstler Family Tree</h1>
            <ul className='introduction-data'>
                <li><span >Total number of family members</span> <span className='accent-color intro-value'>{totalCount}</span></li>
                <li><span>Most common Man's first name</span> <span className='accent-color intro-value'>{mostCommonMaleFirstName}</span></li>
                <li><span>Most common Womans's first name</span> <span className='accent-color intro-value'>{mostCommonFemaleFirstName}</span></li>
                <li><span>Most common surname spelling</span> <span className='accent-color intro-value'>{mostCommonSurname}</span></li>
                <li><span>Oldest family member</span> <span className='accent-color intro-value'>{oldestFamilyMember ? `${oldestFamilyMember.FirstName} ${oldestFamilyMember.LastName} Born: ${oldestFamilyMember.BirthDate}` : "No data available"}</span></li>
                <li><span>Youngest family member</span> <span className='accent-color intro-value'>{youngestFamilyMember ? `${youngestFamilyMember.FirstName} ${youngestFamilyMember.LastName} Born: ${youngestFamilyMember.BirthDate}` : "No data available"}</span></li>
                <li><span>Family time span</span> <span className='accent-color intro-value'>{familyTimeSpan} years</span></li>
            </ul>
            <p className='caption'>*The above snapshot data points are based only on data entered.</p>
        </div>
    );
}
