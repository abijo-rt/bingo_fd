import socket from '../socket.js'
import { useEffect, useState } from 'react';

// const baord  = []  || { player name || player Turn || number Cross STATUS }


const PlayerBoard = () => {

    const [board, setBoard] = useState([]);

    const initBoard = () => {
        // start to listen to emit
        // alert("plauer join ")
        socket.on( 'player joined' , ({ id  , name })=> {
            console.log(board)
            setBoard([...board,{id,name}])
        })
    }

    // init required sockets
    useEffect(()=>{
        initBoard()

        socket.emit('create room', {hostName : 'abijoj' , sizeOfBoard : 5} , (res)=>{
            console.log(res)
        })
        
    },[])

    const testUserAdding = () =>{
        
        socket.emit('join room', {  playerName: 'Johns' , roomid : 1234   } , (res)=>{
            console.log(res)
        })
    }    

    return (
        <>
            <div className='w-[50%] h-[50%] bg-white'>
             {   board.map( (player, index) => (
                    <div key={index}>{player.name}</div>
                ))}
            </div>
            <div>
                <button onClick={testUserAdding}>Test User Adding</button>
            </div>
        </>
    )
}

export default PlayerBoard;