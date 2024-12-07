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
            <div className='introduction-header'>
            {/* <img className='header-image' src="https://www.guicoder.com/werstlerfamily/images/historic-photo-collage-web.jpg" width='50%' height='50%' /> */}
                <h1>Werstler Family Tree</h1>
                <p className='introduction-paragraph'>This is a collection of data of ancestors with the Werstler surname. 
                    I acquired this information from my uncle and my dad. They gained this information from others who researched this before them and contributed to it as they could. 
                    </p>
                <p className='introduction-paragraph'>There are some errors in the data as it was entered into the database by hand, 
                        but I plan to clean up the data where I can.
                        Currently there are no living relatives in the data below, but I hope to add those relatives with their approval. This is a work in progress. I hope to continue building the site.</p>
            </div>
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
