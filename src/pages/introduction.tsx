import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../common/types';
import {downloadCSV} from '../components/download-csv/download-csv';
import {Alert} from '../components/alert/alert';
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
        filteredData: FamilyMember[]; 
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
      filteredData,
    } = introductionData;

    const [alert, setAlert] = useState<boolean | null>(false);
    const [message, setMessage] = useState<string | null>(null);
    const [alertType, setAlertType] = useState<string>(''); 
    //danger,primary,warning,succses

    useEffect(() => {
        if (alert) {
            setMessage('Note: Required data clean up. There are some duplicates. Some of the data for the wife is implied by the husband, but needs be added to the familyMember for her in the database.');
            setAlertType('danger');
        }
      }, [alert]);

    const closeAlert = () => {
        setMessage(null);
        setAlertType('');
      };

    return (
        <div className='introduction'>
            {message &&
                <Alert message={message} alertType={alertType} onClose={closeAlert} />
            }
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
            <p><span>Download</span> <a className='csv-download' onClick={() => downloadCSV(filteredData)}>CSV</a> of filtered table data and save as an excel doc.</p>
        </div>
    );
}
