
import { FamilyMember } from '../../common/types';

interface CardProps {
    siblingRow: boolean;
    pipe: string;
    data: FamilyMember[];
    setSelectedFamilyMember: (selected: FamilyMember) => void;
}

export function Card({data, pipe, setSelectedFamilyMember}: CardProps){

    const handleMouseEnter = (id: string) => {
        const relative = document.getElementById(id);
        if (relative) {
          relative.classList.add('highlight'); // Add highlight class
        }
      };

      const handleMouseLeave = (id: string) => {
        const relative = document.getElementById(id);
        if (relative) {
          relative.classList.remove('highlight'); // Remove highlight class
        }
      };

  const handleSelectFamilyMember = (member: FamilyMember) => {
    setSelectedFamilyMember(member);
  };

return (
    <>
      {data.length > 0 ? (
        data.map((member) => (
          <div className="member-card" key={member.id} id={member.id}>
            <h3 className='card-header'>
            {member.Father=== null &&
              <button title="Click name to see family tree" className='parent-li reset-button family-member-name no-click'>
                {member.FirstName} {member.MiddleName} {member.LastName}
              </button>
              }
              {member.Father !== null &&
              <button title="Click name to see family tree" className='parent-li reset-button family-member-name click-ancestor' onClick={() => handleSelectFamilyMember(member)}>
                {member.FirstName} {member.MiddleName} {member.LastName}
              </button>
              }
            </h3>
            <ul className="card-member">
            {member.BirthDate && <li>Born: {member.BirthDate}</li>}
            {member.DateDeath && <li>Died: {member.DateDeath}</li>}
              {member.Father && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.Father?.id && handleMouseEnter(member.Father.id)}
                  onMouseLeave={() => member.Father?.id && handleMouseLeave(member.Father.id)}
                >
                  Father: {member.Father.FirstName} {member.Father.MiddleName} {member.Father.LastName}
                </li>
              )}
              {member.Mother && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.Mother?.id && handleMouseEnter(member.Mother.id)}
                  onMouseLeave={() => member.Mother?.id && handleMouseLeave(member.Mother.id)}
                >
                  Mother: {member.Mother.FirstName} {member.Mother.MiddleName} {member.Mother.LastName}
                </li>
              )}
              {member.MarriedTo && (
                <li
                  className="parent-li"
                  onMouseEnter={() => member.MarriedTo?.id && handleMouseEnter(member.MarriedTo.id)}
                  onMouseLeave={() => member.MarriedTo?.id && handleMouseLeave(member.MarriedTo.id)}
                >
                  Married to: {member.MarriedTo.FirstName} {member.MarriedTo.MiddleName} {member.MarriedTo.LastName}
                </li>
              )}
              {member.MarriageDate && <li>Marriage date: {member.MarriageDate}</li>}
              {member.Church && <li>Church: {member.Church}</li>}
              {member.BaptismDate && <li>Baptism Date: {member.BaptismDate}</li>}
              {/* {member.History && <li>History: {member.History}</li>} */}
            </ul>
            <div className={pipe}>&nbsp;</div>
          </div>
        ))
      ) : (
        <p>No family members match the search criteria.</p>
      )}
    </>
  );

}

