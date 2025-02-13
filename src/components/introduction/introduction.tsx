import React, {useLayoutEffect, useMemo } from 'react';
import { FamilyMember } from '../../common/types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  getFamilyTimeSpan,
  getMostCommonSurname,
  getMostCommonFirstNameByGender,
  getOldestFamilyMember,
  getYoungestFamilyMember,
} from '../../utilities/utilities';
import { defaultFamilyMember } from '../../constants/constants';
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
                    Welcome to my family tree website, dedicated to tracing the Werstler lineage. This is a living document that I plan to expand as I gather more information and refine existing records.
                    </p>
                    <p className='introduction-paragraph'>
                    The earliest known ancestor, Johann Andreas Wuershler, was born in 1620 in <a href="https://en.wikipedia.org/wiki/W%C3%BCrselen" target="_blank">Wurselen</a>, 
                    Germany, near <a href="https://en.wikipedia.org/wiki/Aachen" target="_blank">Aachen</a>. This historically significant region was once Charlemagne's winter court and the 
                    coronation site of German kings. Johann Andreas lived through the <a href="https://en.wikipedia.org/wiki/Thirty_Years%27_War" target="_blank">Thirty Years' War</a> and, as a Lutheran, relocated to Winden due to religious persecution. 
                    He held an official role in the community but died in 1665 after a dispute over livestock.
                    </p>
                     <p className='introduction-paragraph'>I look forward to discovering more about our family's history and sharing these stories along the way.</p>
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
