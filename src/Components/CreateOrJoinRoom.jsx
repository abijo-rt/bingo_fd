import { useEffect, useState } from "react";
import socket from "../socket";


const CreateOrJoinRoom = () => {

    const createRoomAPI = (hostName,sizeOfBoard) => {
        socket.emit('create room', {hostName , sizeOfBoard} , (res)=>{
            console.log(res)
        })
    }

    const createRoom = () => {
        createRoomAPI(hostName,sizeOfBoard);
    }
   
    const [hostName,setHostName] = useState('');
    const [sizeOfBoard,setSizeOfBoard] = useState(5);

    return(
        <>
            <div className="">
                hihi
            </div>
        </>
    )

}

export default CreateOrJoinRoom;