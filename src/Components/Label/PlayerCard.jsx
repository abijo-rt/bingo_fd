import {Question , CheckCircle} from  'phosphor-react';

const PlayerCard = ({player,index}) => {
    return (
        <>  
            <div className="text-[#C08B5C] rounded-md flex w-full brd-3d-4 bg-[#FCF596] border-[#C08B5C]">
                <div className='  border-r-2 border-[#C08B5C]  size-12 flex items-center justify-center '>{index+1}</div>
                <div className='w-[70%] pl-4 flex items-center justify-start '>{player.name}</div>
                <div className='w-[15%] flex items-center justify-start'>
                    {
                        player.isCrossed == true ? <CheckCircle size={36} color="#76b792" weight="fill" />: <Question size={36} color="#4379F2" weight="fill" />
                    }
                </div>
            </div>

        </>
    )
}

export default PlayerCard;