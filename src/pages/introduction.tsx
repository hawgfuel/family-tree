import React, {useLayoutEffect, useMemo } from 'react';
import { FamilyMember } from '../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
  getFamilyTimeSpan,
  getMostCommonSurname,
  getMostCommonFirstNameByGender,
  getOldestFamilyMember,
  getYoungestFamilyMember,
} from '../utilities/utilities';
import { defaultFamilyMember } from '../constants/constants';
import './introduction.css';

interface IntroductionProps {
    setIsActive: React.Dispatch<React.SetStateAction<string>>;
    isActive:string;
    contentRef: React.RefObject<HTMLDivElement>;
  }
  
  export function Introduction({ setIsActive, contentRef, isActive }: IntroductionProps) {
    const filteredData = useSelector((state: RootState) => state.familyTree.filteredData);

  const introductionData = useMemo(() => {
    return {
      totalCount: filteredData.length,
      mostCommonMaleFirstName: getMostCommonFirstNameByGender(filteredData, 'male') || 'unknown',
      mostCommonFemaleFirstName: getMostCommonFirstNameByGender(filteredData, 'female') || 'unknown',
      mostCommonSurname: getMostCommonSurname(filteredData) || '',
      oldestFamilyMember: getOldestFamilyMember(filteredData) || defaultFamilyMember,
      youngestFamilyMember: getYoungestFamilyMember(filteredData) || defaultFamilyMember,
      familyTimeSpan: getFamilyTimeSpan(filteredData) || 0,
      filteredData: filteredData,
    };
  }, [filteredData]);

    const handleTabChange = (tab: string) => {
        setIsActive(`tab-${tab}`);
    };

    useLayoutEffect(() => {
        if (isActive === 'tab-2' && contentRef.current) {
            setTimeout(() => {
                contentRef.current?.scrollIntoView({ behavior: "smooth" });
            }, 0);
        }
    }, [isActive]);

    return (
        <div className='introduction'>
            <div className='introduction-header'>
                <div className='intro-item image' role="presentation">
                    <a href="#content" onClick={() => handleTabChange('2')}>
                    <img 
                    alt='Collage of photographs of Werslter family members over the years'
                    title='Click on the image to see gallery below'
                    className='header-image' 
                    src="https://www.guicoder.com/werstlerfamily/images/historic-photo-collage2.png" 
                    width='100%' height='100%' />
                    </a>
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
                <li><span >Total number of family members</span> <span className='accent-color intro-value'>{introductionData.totalCount}</span></li>
                <li><span>Most common Man's first name</span> <span className='accent-color intro-value'>{introductionData.mostCommonMaleFirstName}</span></li>
                <li><span>Most common Womans's first name</span> <span className='accent-color intro-value'>{introductionData.mostCommonFemaleFirstName}</span></li>
                <li><span>Most common surname spelling</span> <span className='accent-color intro-value'>{introductionData.mostCommonSurname}</span></li>
                <li><span>Oldest family member</span> <span className='accent-color intro-value'>{introductionData.oldestFamilyMember ? `${introductionData.oldestFamilyMember.FirstName} ${introductionData.oldestFamilyMember.LastName} Born: ${introductionData.oldestFamilyMember.BirthDate}` : "No data available"}</span></li>
                <li><span>Youngest family member</span> <span className='accent-color intro-value'>{introductionData.youngestFamilyMember ? `${introductionData.youngestFamilyMember.FirstName} ${introductionData.youngestFamilyMember.LastName} Born: ${introductionData.youngestFamilyMember.BirthDate}` : "No data available"}</span></li>
                <li><span>Family time span</span> <span className='accent-color intro-value'>{introductionData.familyTimeSpan} years</span></li>
            </ul>
            <p className='caption'>*The above snapshot data points are based only on data entered.</p>
        </div>
    );
}
