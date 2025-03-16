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


            <div className=' bg-[#FFC94A] gluten-500 w-[30%] h-[75%] overflow-auto flex flex-col rounded-md brd-3d-4   border-[#C08B5C]'>

                <div className=' w-full text-[#C08B5C] h-13 pt-2 border-b-2 bg-[#FCF596] rounded-t-md border-b-[#C08B5C] text-2xl flex items-center justify-center'>
                        Player Board
                </div>

                <div className='flex flex-col flex-grow w-full  space-y-3 p-2'>
                    {board.map( (player, index) => (
                        <div key={index} className='w-full' >
                           <PlayerCard player={player} index = {index} />
                        </div>
                    ))}
                </div>

            </div>
        </>
    )
}

export default PlayerBoard;

