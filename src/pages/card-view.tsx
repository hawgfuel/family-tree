
import { FamilyMember } from '../common/types';
import {Card} from '../components/card/card';

interface CardProps{
    filteredData: FamilyMember[];
}

export function CardView({filteredData}: CardProps){
    return(
        <div className='card-view'>
            <Card filteredData={filteredData} />
        </div>
    )
}