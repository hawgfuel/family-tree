import React from 'react';
import {render} from '@testing-library/react';
import { describe, expect, test } from '@jest/globals';
import { Introduction } from '../pages/introduction.tsx';
import {defaultFamilyMember} from '../constants/constants';

test('Renders Introduction section', () => {
    const {getAllByText} = render(
        <Introduction introductionData={{
            totalCount: 0,
            mostCommonMaleFirstName: '',
            mostCommonFemaleFirstName: '',
            mostCommonSurname: '',
            oldestFamilyMember: defaultFamilyMember,
            youngestFamilyMember: defaultFamilyMember,
            familyTimeSpan: 0,
        }} />,
    );
    expect(getAllByText('Werstler Family Tree'));
});