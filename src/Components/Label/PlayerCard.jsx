import {Question , CheckCircle} from  'phosphor-react';

const PlayerCard = ({player,index}) => {
    return (
        <>  
            <div className="rounded-md flex w-full border-4 h-10 border-[#5B913B]">
                <div className=' bg-[rgb(255,217,95)] border-r-4 border-[#5B913B] rounded-l-md w-[15%] flex items-center justify-center '>{index+1}</div>
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