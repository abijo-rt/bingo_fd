import { useEffect, useState } from "react";
import PlayerBoard from "../Components/PlayerBoard";
import { useSearchParams } from "react-router-dom";
import GameBoard from "../Components/Gameboard";
import PlayerTurnBoard from "../Components/PlayerTurnBoard";
import {PlayerJoinedAlert , RoomNotFoundAlert, WinnerAlert } from "../Components/Label/Alert";

const GameLobby = () => {

    const [searchParams] = useSearchParams();
    const roomid = searchParams.get("roomid");

    // alert
    const [PJAlert,PJA_onClose] = useState(false)
    const [RNFAlert,RNFA_onClose] = useState(false)
    const [WAlert,WA_onClose] = useState(false)
    
    useEffect(()=>{
        // alert(searchParams)
        console.log("gamelooby " + searchParams)
    },[roomid])

    const cusAlert = (alert_no) => {

        if(alert_no === 1)PJA_onClose(true)
        else if (alert_no ===2) RNFA_onClose(true)  
        else if (alert_no ===3) WA_onClose(true)  
    }

    return (

        <div className="w-full h-full game-lobby flex flex-col items-center justify-center space-y-5 relative">
           { PJAlert && <PlayerJoinedAlert onClose={PJA_onClose}/>}
           { RNFAlert && <RoomNotFoundAlert onClose={RNFA_onClose}/>}
           { WAlert && <WinnerAlert onClose={WA_onClose}/>}
            <div className="h-[10%] w-[50%] flex items-center justify-center">
                <PlayerTurnBoard roomid={roomid}/>
            </div>
            <div className="  flex w-[70%] flex-grow justify-center space-x-20 ">
                <PlayerBoard roomid={roomid} cusAlert={cusAlert}/>
                <GameBoard roomid={roomid} cusAlert = {cusAlert} />
            </div>
        </div>
    )

}

export default GameLobby ;