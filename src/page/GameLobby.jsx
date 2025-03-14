import { useEffect } from "react";
import PlayerBoard from "../Components/PlayerBoard";
import { useSearchParams } from "react-router-dom";
import GameBoard from "../Components/Gameboard";
import PlayerTurnBoard from "../Components/PlayerTurnBoard";

const GameLobby = () => {

    const [searchParams] = useSearchParams();
    const roomid = searchParams.get("roomid");
    
    useEffect(()=>{
        // get game deatils || pass the data to playerBoard ... gameCanva ... bingo pad 
        console.log("gamelooby " + roomid)
    },[roomid])

    return (
        <div className="w-full h-full game-lobby flex flex-col items-center justify-center space-y-5">
            <div className="h-[10%] w-[50%] flex items-center justify-center">
                <PlayerTurnBoard roomid={roomid}/>
            </div>
            <div className="  flex w-[70%] flex-grow justify-center space-x-20 ">
                <PlayerBoard roomid={roomid}/>
                <GameBoard roomid={roomid}/>
            </div>
        </div>
    )

}

export default GameLobby ;