import { FamilyMember } from '../../common/types';

interface CardProps{
    filteredData: FamilyMember[];
}

export function Card({filteredData}: CardProps){
    return(
        <div className="card-container">
        {filteredData.map((member, index) => (
            <div className="family-card" key={index}>
                <h3>{member.FirstName} {member.LastName}</h3>
                {member.MaidenName &&
                    <p>Maiden name: {member.MaidenName}</p>
                }       
                <p>Born: {member.BirthDate || 'Not Available'}</p>
                {member.BirthPlace &&
                    <p>Birth place: {member.BirthPlace}</p>
                }
                {member.DateDeath && <p>Died: {member.DateDeath}</p>}
                {member.Church &&
                    <p>Church: {member.Church}</p>
                }
                {member.BaptismDate &&
                    <p>Baptism date: {member.BaptismDate}</p>
                }
                {member.History &&
                    <p>History: {member.History}</p>
                }
                
            </div>
        ))}
    </div>
    )
}