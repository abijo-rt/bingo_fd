import React, { useState } from "react";
import socket from "../socket";
import { useNavigate } from "react-router-dom";

function JoinRoom({cusAlert_join}) {

  const [name, setName] = useState("");
  const [teamCode, setTeamCode] = useState();
  const navigate = useNavigate();
  
  // added by abij0
  const joinRoom = () => {

    socket.emit('join room',{ playerName : name , roomid : teamCode },(res)=>{
        console.log(res)

        if(res.status){
          navigate(`/gameLobby?roomid=${teamCode}`);
        }else { cusAlert_join(1) }

    });

  }
    


  return (
    <div className="w-[100%] max-w-md mt-6 flex flex-col items-center brd-3d-4 bg-[#FFC94A] border-[#C08B5C] text-[#795458] p-6 rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">Join a Room</p>

      <div className="w-[95%] mb-3 flex flex-col items-start">
        <label className="  font-medium mb-1">Your Name</label>
        <input
          className="brd-3d-4 h-[2.6rem] w-full border-2 border-[#C08B5C] px-4 py-2 rounded-md focus:outline-none"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-[95%] mb-3">
        <label className="block font-medium mb-1 flex flex-col items-start">Team Code</label>
        <input
          className=" brd-3d-4 h-[2.6rem] w-full  border-[#C08B5C] px-4 py-2 rounded-md focus:outline-none"
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={()=>joinRoom()}
        className="h-[2.6rem] w-[95%] mt-2 bg-[#C08B5C] text-white font-bold rounded-md  transition-all"
      >
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;
