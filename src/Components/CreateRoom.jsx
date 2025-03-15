import { useState } from "react";
import socket from "../socket";
import JoinRoom from "./JoinRoom";
import { Navigate, useNavigate } from "react-router-dom";

const CreateRoom = ({cusAlert}) => {
  
  const [activeTab, setActiveTab] = useState("create"); // 'create' or 'join'
  const [hostName, setHostName] = useState("");
  const [sizeOfBoard, setSizeOfBoard] = useState(5);

  const navigate = useNavigate();

  const createRoomAPI = (hostName, sizeOfBoard) => {
      socket.emit("create room", { hostName, sizeOfBoard }, (res) => {
        console.log(res);
        if(res.status){
          navigate(`/gameLobby?roomid=${res.msg}`);
        }
      });
  };

  const cusAlert_join = (alert_no) => {
    cusAlert(alert_no)
  }

  const createRoom = () => {
    createRoomAPI(hostName, sizeOfBoard);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full indie-flower ">
      <div className="relative w-[20rem] h-[2.8rem] bg-[#FFC94A] rounded-lg flex items-center p-1 border-2 border-[#C08B5C] border-b-4 border-r-4">
        <div
          className={`absolute top-0 left-0 h-full w-1/2 bg-[#C08B5C]  transition-all duration-300 ${
            activeTab === "join" ? "translate-x-full rounded-r-sm" : "rounded-l-sm"
          }`}
        ></div>
        <button
          onClick={() => setActiveTab("create")}
          className={`w-1/2 h-full flex items-center justify-center z-10 ${
            activeTab === "create" ? "text-white" : "text-[#C08B5C]"
          }`}
        >
          Create Room
        </button>
        <button
          onClick={() => setActiveTab("join")}
          className={`w-1/2 h-full flex items-center justify-center z-10 ${
            activeTab === "join" ? "text-white" : "text-[#C08B5C]"
          }`}
        >
          Join Room
        </button>
      </div>

      {activeTab === "create" && (
        <form className="text-[#795458] w-[20rem] max-w-md mt-6 flex flex-col items-center brd-3d-4 border-[#C08B5C] p-6 rounded-lg bg-[#FFC94A] ">
          <p className="text-xl font-bold  mb-4">CREATE NEW ROOM</p>
          
          <div className="w-[95%] mb-3">
            <label className="block  font-medium mb-1">Host Name</label>
            <input
              className="h-[2.6rem] w-full border-2 border-[#C08B5C] border-b-4 border-r-4 px-4 py-2 rounded-md focus:outline-none"
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
            />
          </div>

          <div className="w-[95%] mb-3 ">
            <label className="block  font-medium mb-1">Board Size</label>
            <input
              className="h-[2.6rem] w-full border-2 border-[#C08B5C] px-4 py-2 rounded-md focus:outline-none border-b-4 border-r-4"
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
            className=" h-[2.6rem] w-[95%] mt-2 bg-[#C08B5C] border-[#453F78] text-white font-bold text-lg flex items-center justify-center rounded-md  transition-all"
          >
            Create Room
          </button>
        </form>
      )}

      {activeTab === "join" && (
        <div className="w-[20rem] max-w-md text-center">
          <JoinRoom cusAlert_join = {cusAlert_join} />
        </div>
      )}
    </div>
  );
};

export default CreateRoom;
