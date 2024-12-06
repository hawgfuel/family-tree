import { FamilyMember } from '../common/types';

export const defaultFamilyMember: FamilyMember = {
    FirstName: 'Unknown',
    LastName: '',
    MiddleName: '',
    BirthDate: '',
    BirthPlace: '',
    id: '',
    Mother: null,
    Father: null,
    History:'',
    Children: [{child:'', id:''}],
  };

  export const parseDate = (dateStr: string): Date | null => {
    const parts = dateStr.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts.map(Number);
      if (day && month && year) {
        return new Date(year, month - 1, day);
      }
    }
    return null;
  };