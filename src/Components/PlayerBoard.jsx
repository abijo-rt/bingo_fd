import socket from '../socket.js'
import { useEffect, useState } from 'react';

// const baord  = []  || { player name || player Turn || number Cross STATUS }


const PlayerBoard = () => {

    const [board, setBoard] = useState([]);

    const initBoard = () => {
        // start to listen to emit
        socket.on( 'player joined' , ({ id  , name })=> {
            setBoard([...board,{id,name}])
        })
    }

    // init required sockets
    useEffect(()=>{
        initBoard()
    },[])

    // asdf

    return (
        <>
            <div>
             {   board.map( player => (
                    <div>{player}</div>
                ))}
            </div>
        </>
    )
}

export default PlayerBoard;