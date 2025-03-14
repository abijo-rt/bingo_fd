import { useEffect, useState } from "react";
import socket from "../socket";

const PlayerTurnBoard = ({roomid}) => {

        const [ player,setPlayer ] = useState("");
        const [ playerid,setPlayerId ] = useState("");
        const [ num, setNum ] = useState(-1);
        const [gameStatus , setGameStatus] = useState("")

        const intisocket = () => {

            socket.on('player turn', ({player_turn}) => {
                console.log("player turn"+ player_turn)
                setPlayer(player_turn.name);
                setPlayerId(player_turn.id);
                alert(player_turn.choosen_number)
                setNum(player_turn.choosen_number);
            })

            socket.on('number choosen',(choosen_number)=>{
                setNum(choosen_number)
            })

            socket.emit('get init game status', {roomid} ,( res )=>{
              console.log(res)
              if(res.status)  setGameStatus(res.gameStatus)
            })

            socket.on('listen to game status',(res)=>{
                setGameStatus(res)
            })
            

        }

        useEffect(()=>{

            intisocket()
            return () => {
                socket.off('player turn')
            }

        },[])

        useEffect(()=>{
            console.log(num)
        },[num])

 

    return (
        <>
            <div>
          { 
            gameStatus == "lobby" ? <></>   : <div className=" flex text-3xl  ">
                <div> { playerid == socket.id ? "Its Your Turn" : `${player} is Choos` } </div>
                <div> { num == -1 ? <span> ing... </span> : <span> en {num} </span> } </div>
            </div>
          }
            </div>
        </>
    )


}


export default PlayerTurnBoard ;