import { useState } from "react";
import socket from "../socket";
import JoinRoom from "./JoinRoom";
import { Navigate, useNavigate } from "react-router-dom";
const CreateRoom = () => {
  
  const [activeTab, setActiveTab] = useState("create"); // 'create' or 'join'
  const [hostName, setHostName] = useState("");
  const [sizeOfBoard, setSizeOfBoard] = useState(5);

  const navigate = useNavigate();

  const createRoomAPI = (hostName, sizeOfBoard) => {
      socket.emit("create room", { hostName, sizeOfBoard }, (res) => {
        console.log(res);
        if(res.status){
          navigate(`/gameLobby?roomid=1234`);
        }
      });
  };

  const createRoom = () => {
    createRoomAPI(hostName, sizeOfBoard);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="relative w-[20rem] h-[3.5rem] bg-gray-300 rounded-lg flex items-center p-1">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-[#fdc659] rounded-lg transition-all duration-300 ${
            activeTab === "join" ? "translate-x-full" : ""
          }`}
        ></div>
        <button
          onClick={() => setActiveTab("create")}
          className={`w-1/2 h-full flex items-center justify-center z-10 ${
            activeTab === "create" ? "text-white" : "text-gray-600"
          }`}
        >
          Create Room
        </button>
        <button
          onClick={() => setActiveTab("join")}
          className={`w-1/2 h-full flex items-center justify-center z-10 ${
            activeTab === "join" ? "text-white" : "text-gray-600"
          }`}
        >
          Join Room
        </button>
      </div>

      {activeTab === "create" && (
        <form className="w-[80%] max-w-md mt-6 flex flex-col items-center border-2 border-[#fdc659] p-6 rounded-lg">
          <p className="text-xl font-semibold text-gray-800 mb-4">Create a Room</p>
          
          <div className="w-[70%] mb-3">
            <label className="block text-gray-800 font-medium mb-1">Host Name</label>
            <input
              className="h-[3rem] w-full border-2 border-[#fdc659] px-4 py-2 rounded-md focus:outline-none"
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
            />
          </div>

          <div className="w-[70%] mb-3">
            <label className="block text-gray-800 font-medium mb-1">Board Size</label>
            <input
              className="h-[3rem] w-full border-2 border-[#fdc659] px-4 py-2 rounded-md focus:outline-none"
              type="number"
              min="5"
              max="10"
              value={sizeOfBoard}
              onChange={(e) => setSizeOfBoard(parseInt(e.target.value))}
            />
          </div>

          <button
            onClick={createRoom}
            type="button"
            className="h-[3rem] w-[70%] mt-2 bg-[#fdc659] text-white font-bold rounded-md hover:bg-[#e6b850] transition-all"
          >
            Create
          </button>
        </form>
      )}

      {activeTab === "join" && (
        <div className="w-[100%] max-w-md text-center">
          <JoinRoom />
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
