import socket from '../socket.js'
import { useEffect, useState } from 'react';

// const baord  = []  || { player name || player Turn || number Cross STATUS }


const PlayerBoard = () => {

    const [board, setBoard] = useState([{id:0,name:'abijo'},{id:1,name:'vj'},{id:2,name:'vk'}]);
    const [currTurn,setCurrTurn] = useState(-1);
    

    const initBoard = () => {

        socket.on( 'player joined' , ({ id  , name  })=> {
            console.log(board)
            setBoard([...board,{ id , name , isCrossed : false }])
        })

        socket.on( 'player turn' , ({id})=>{
            setBoard(id);
        })

        socket.on('players crossed', (numberCrossedStatus) => {
            setBoard(prevBoard =>
                prevBoard.map(player => {
                    const updatedStatus = numberCrossedStatus.find(status => status.id === player.id);
                    return updatedStatus ? { ...player, isCrossed: updatedStatus.isCrossed } : player;
                })
            );
        });
        

    }


    // this soulh be use in the board comonent
    // const numberCrossed = () => {
    //     socket.emit('cross number', { roomid : 1234 });
    // }

    // init required sockets
    useEffect(()=>{
        initBoard()
    },[])

   

    return (
        <>  

            {/* use this for format to crate ui */}

            <div className=' gluten-500 w-[20%] h-[70%] bg-white flex flex-col rounded-md'>

                <div className='w-full h-10 border-b border-b-gray-300 text-2xl flex items-center justify-center text-[#211C84]'>PlayerBoard</div>
                <div className='flex flex-col flex-grow w-full pt-3 space-y-3'>
                    {board.map( (player, index) => (
                        <div key={index} className='w-full flex  bg-amber-100' >

                            <div className='w-[10%] flex items-center justify-center'>{index}</div>
                            <div className='w-[50%] flex items-center justify-start'>{player.name}</div>
                            <div className='w-[40%] flex items-center justify-start'>
                            {
                                player.isCrossed == true ? <div className='w-4 h-4 bg-green-500 rounded-md'>MARKED</div> : <div className='size-fit p-1 bg-red-500 rounded-md'>not crossed</div>
                            }
                            </div>

                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}

export default PlayerBoard;

