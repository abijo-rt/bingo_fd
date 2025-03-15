import socket from '../socket.js'
import { useEffect, useState } from 'react';
import PlayerCard from './Label/PlayerCard.jsx'
// const baord  = []  || { player name || player Turn || number Cross STATUS }


const PlayerBoard = ({roomid,cusAlert}) => {

    const [board, setBoard] = useState([]);
    // const [isStarted,setStarted] = useState(false)
    

    const initBoard = () => {

        console.log("ROOM ID" + roomid )
        
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
            cusAlert(1)
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

        // socket.on("listen to game status", (res) => {
        //     if(res == 'game started')setStarted(true);
        // });

        return () => {
            socket.off('player joined');
            socket.off('test');
            socket.off('players crossed');
        };



    }

    // const startGame = () => {
    //     socket.emit('init game', {roomid : roomid} ,(res)=>{
    //         console.log(res)
    //     });
    // }

    // const Bingo = () => {
    //     socket.emit('Bingo', {roomid : roomid} ,(res)=>{
    //         console.log(res)
    //     });
    // }


    useEffect(()=>{
        initBoard()
    },[])

   

    return (
        <>  

            {/* use this  format to create ||  ui */}


            <div className=' bg-[#AEEA94] gluten-500 w-[30%] h-[70%]  flex flex-col rounded-md border-4  border-b-8 border-r-8   border-[#5B913B]'>

                <div className=' w-full h-fit pt-2 border-b-4  border-b-[#5B913B] text-2xl flex items-center justify-center text-[#5B913B]'>
                        Player Board
                </div>

                <div className='flex flex-col flex-grow w-full pt-3 space-y-3 p-2'>
                    {board.map( (player, index) => (
                        <div key={index} className='w-full' >
                           <PlayerCard player={player} index = {index} />
                        </div>
                    ))}
                </div>

                {/* <div className=' p-5 w-full h-fit border-t-4 bg-amber-300  border-t-[#5B913B] text-2xl flex items-center justify-center text-[#211C84]'>
                    
                    <div class={` ${isStarted ? 'hidden' : 'display' } btn-3d bg-blue-500 border-blue-400 `}  >
                          <button onClick={()=>startGame()} class='    w-full h-full flex flex-col justify-center items-center  font-bold text-lg text-white  '>
                                <span >START GAME</span>
                          </button>
                    </div> 
    
                    <div class={`${isStarted ? 'display' : 'hidden' } btn-3d bg-yellow-300 border-yellow-500 `}  >
                          <button onClick={()=>Bingo()} class='w-full h-full flex flex-col justify-center items-center  font-bold text-lg text-white  '>
                                <span >BINGO</span>
                          </button>
                    </div> 
    
    
                </div> */}

                <div className='w-full h-fit p-5 flex items-center justify-center'>
                    {roomid}
                </div>

            </div>
        </>
    )
}

export default PlayerBoard;

