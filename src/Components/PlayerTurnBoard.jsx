import { useEffect, useState } from "react";
import socket from "../socket";

const PlayerTurnBoard = () => {

        const [ player,setPlayer ] = useState("");
        const [ num, setNum ] = useState(-1);

        const intisocket = () => {

            socket.on('player turn', ({player_turn}) => {
                console.log("init turn brd working")

                console.log(player_turn)
                console.log(player_turn.choosen_number)
                console.log(player_turn.name)
                setPlayer(player_turn.name);
                setNum(player_turn.choosen_number);
                
            })

        }

        useEffect(()=>{
            console.log(player)
            console.log(num)
        },[player,num])

        useEffect(()=>{

            console.log("init turn brd")
            intisocket()
           
            return () => {
                socket.off('player turn')
            }

        },[])

 

    return (
        <>
            <div className=" flex text-3xl space-x-5 ">
                <div> {player} </div>
                <div> { num == -1 ? <span> Choosing </span> : num} </div>
            </div>
        </>
    )


}


export default PlayerTurnBoard ;