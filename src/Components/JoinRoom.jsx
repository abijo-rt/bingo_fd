import React, { useState } from "react";

function JoinRoom() {
  const [name, setName] = useState("");
  const [teamCode, setTeamCode] = useState("");

  return (
    <div className="w-[100%] max-w-md mt-6 flex flex-col items-center border-2 border-[#fdc659] p-6 rounded-lg">
      <p className="text-xl font-semibold text-gray-800 mb-4">Join a Room</p>

      <div className="w-[70%] mb-3">
        <label className="block text-gray-800 font-medium mb-1">Your Name</label>
        <input
          className="h-[3rem] w-full border-2 border-[#fdc659] px-4 py-2 rounded-md focus:outline-none"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-[70%] mb-3">
        <label className="block text-gray-800 font-medium mb-1">Team Code</label>
        <input
          className="h-[3rem] w-full border-2 border-[#fdc659] px-4 py-2 rounded-md focus:outline-none"
          type="text"
          value={teamCode}
          onChange={(e) => setTeamCode(e.target.value)}
        />
      </div>

      <button
        type="button"
        className="h-[3rem] w-[70%] mt-2 bg-[#fdc659] text-white font-bold rounded-md hover:bg-[#e6b850] transition-all"
      >
        Join Room
      </button>
    </div>
  );
}

export default JoinRoom;
