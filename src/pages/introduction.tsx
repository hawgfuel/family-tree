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
    setIsActive: React.Dispatch<React.SetStateAction<string>>;
  }
  
  export function Introduction({ introductionData, setIsActive }: IntroductionProps) {
    const {
    totalCount,
    mostCommonMaleFirstName,
    mostCommonFemaleFirstName,
    mostCommonSurname,
      oldestFamilyMember,
      youngestFamilyMember,
      familyTimeSpan,
    } = introductionData;

    const handleTabChange = (tab: string) => {
        setIsActive(`tab-${tab}`);
    };
    return (
        <div className='introduction'>
            <div className='introduction-header'>
                <div className='intro-item image' role="presentation">
                    <img 
                    alt='Collage of photographs of Werslter family members over the years'
                    title='Click on the image to see gallery below'
                    onClick={() => handleTabChange('2')}
                    className='header-image' 
                    src="https://www.guicoder.com/werstlerfamily/images/historic-photo-collage-web.jpg" 
                    width='100%' height='100%' />
                </div>
                <div className='intro-item'>
                    <h1>Werstler Family Tree</h1>
                    <p className='introduction-paragraph'>
                        Below is a collection of data of ancestors with the Werstler surname. 
                        This is a living document that I plan to grow as I collect more information and find new ways to present it.
                    </p>
                    <p className='introduction-paragraph'>There are some errors in the data as it was entered into the database by hand, 
                            but I plan to clean up the data where I can.
                            Currently there are no living relatives in the data below, but I hope to add those relatives with their approval. 
                    </p>
                </div>
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
