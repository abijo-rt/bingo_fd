import socket from '../socket.js'
import { useEffect, useState } from 'react';

// const baord  = []  || { player name || player Turn || number Cross STATUS }


const PlayerBoard = ({roomid}) => {

    const [board, setBoard] = useState([]);
    const [currTurn,setCurrTurn] = useState(-1);
    
    

    const initBoard = () => {

        console.log("ROOM ID"+roomid)
        
        // set a socket emit to get the intial data 
        socket.emit( 'get init player board' , {roomid} , (res) => {
            console.log(res)
            const board = res.player.map( player =>{
                player.isCrossed = false 
                return player
            } );
            setBoard(board)
            console.log(board)
        })

        socket.on( 'player joined' , ({ player  }) => {
            console.log("player board data")
            console.log(player)
            setBoard(player)
        })

       
        socket.on('players crossed', (numberCrossedStatus) => {
            setBoard(prevBoard =>
                prevBoard.map(player => {
                    const updatedStatus = numberCrossedStatus.find(status => status.id === player.id);
                    return updatedStatus ? { ...player, isCrossed: updatedStatus.isCrossed } : player;
                })
            );
        });

        socket.on('test',(data)=>{
            console.log(data)
        })
        
        return () => {
            socket.off('player joined');
            socket.off('test');
            socket.off('players crossed');
        };



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

            {/* use this  format to create ||  ui */}

            <div className=' gluten-500 w-[20%] h-[70%] bg-white flex flex-col rounded-md border-2 border-gray-200'>

                <div className='w-full h-10 border-b border-b-gray-300 text-2xl flex items-center justify-center text-[#211C84]'>PlayerBoard</div>
                <div className='flex flex-col flex-grow w-full pt-3 space-y-3'>
                    {board.map( (player, index) => (
                        <div key={index} className='w-full flex  bg-amber-100' >

                            <div className='w-[10%] flex items-center justify-center'>{index+1}</div>
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

