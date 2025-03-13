import { useEffect, useState } from "react";
import socket from "../socket";

const GameBoard = () => {

    const testBoard = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,21,20,22,23,24,25]
    const [gameBoard,setBoard] = useState([])

    useEffect(()=>{
        socket.on('game state',({board})=>{
            setBoard(board)
        })
        
    },[])

    const startGame = () =>{
        // console.log("asf")
        socket.emit('init game', {roomid : 1234} ,(res)=>{
            console.log(res)
        });
    }

    return ( 
        <>
            <div>
                <div className="grid grid-cols-5 gap-2">

                   { gameBoard.map( (num , index) =>(
                    <div key={index} className=" size-16 border rounded-3xl flex items-center justify-center text-xl font-bold">{num}</div>
                   ))
                   }

                </div>

                <button onClick={()=>startGame()}>STRART BAMGE</button>
            </div>
        </>
    )

}

export default GameBoard;