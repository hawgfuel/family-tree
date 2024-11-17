import { FamilyMember } from '../../common/types';

interface CardProps{
    filteredData: FamilyMember[];
}

export function Card({filteredData}: CardProps){
    return(
        <div className="card-container">
        {filteredData.length > 0 && filteredData.map((member, index) => (
            <div className="family-card" key={index}>
                <h3>{member.FirstName} {member.LastName}</h3>
                <ul className='card-member'>
                    {member.MaidenName && <li>Maiden name: {member.MaidenName}</li>}       
                    {member.BirthDate && <li>Born: {member.BirthDate}</li>}
                    {member.BirthPlace && <li>Birth place: {member.BirthPlace}</li>}
                    {member.DateDeath && <li>Died: {member.DateDeath}</li>}
                    {member.Father && <li>Father: {member.Father}</li>}
                    {member.Mother && <li>Mother: {member.Mother}</li>}
                    {member.Church && <li>Church: {member.Church}</li>}
                    {member.BaptismDate && <li>Baptism date: {member.BaptismDate}</li>}
                    {member.History && <li>History: {member.History}</li>}
                </ul>
            </div>
        ))}
    </div>
    )
}