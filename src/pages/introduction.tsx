import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../common/types';
import {downloadCSV} from '../components/download-csv/download-csv';
import {Alert} from '../components/alert/alert';

interface IntroductionProps {
    introductionData: {
        totalCount: number;
        mostCommonFirstName: string;
        oldestFamilyMember: FamilyMember;
        youngestFamilyMember: FamilyMember;
        filteredData: FamilyMember[]; 
    };
  }
  
  export function Introduction({ introductionData }: IntroductionProps) {
    const {
    totalCount,
      mostCommonFirstName,
      oldestFamilyMember,
      youngestFamilyMember,
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
                <li><span>Total number of family members:</span> {totalCount}</li>
                <li><span>Most common first name:</span> {mostCommonFirstName}</li>
                <li>
                    <span>Oldest family member:</span> {oldestFamilyMember ? `${oldestFamilyMember.FirstName} ${oldestFamilyMember.LastName} Born: ${oldestFamilyMember.BirthDate}` : "No data available"}
                </li>
                <li>
                    <span>Youngest family member:</span> {youngestFamilyMember ? `${youngestFamilyMember.FirstName} ${youngestFamilyMember.LastName} Born: ${youngestFamilyMember.BirthDate}` : "No data available"}
                </li>
                <li><span>Download</span> <a className='csv-download' onClick={() => downloadCSV(filteredData)}>CSV</a> of filtered table data and save as an excel doc.</li>
            </ul>
        </div>
    );
}
