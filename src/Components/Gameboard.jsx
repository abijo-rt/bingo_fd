import { useEffect, useState } from "react";
import socket from "../socket";

const GameBoard = (roomid) => {

    const [gameBoard,setBoard] = useState([])
    const [ player,setPlayer ] = useState("");
    const [ playerId,setPlayerId ] = useState("");
    const [choosen_number, setNum ] = useState(-1);
    const [gameStatus , setGameStatus] = useState("");
    const [btn,setBtn] = useState("red");
    const [disable,setDisable] = useState("none");
    const [allCrossedNumber,setAllCrossedNumber] = useState([])

    const intisocket = () => {

        socket.on('player turn', ({player_turn}) => {
            setPlayer(player_turn.name);
            setNum(player_turn.choosen_number);
            setPlayerId(player_turn.id)
        })

       
        socket.on('number choosen', (data) => {
             setNum(data)
             setAllCrossedNumber(prev => [...prev,data])
        })

        //  socket.on('round over',(data)=>{
        //  
        // })

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
            socket.off('get init game status')
            socket.off('number choosen')
        }

    },[])

    useEffect(()=>{
        if( playerId == socket.id && choosen_number == -1 ) {
            setBtn("green")
            setDisable("auto")
        }else if(playerId == socket.id && choosen_number != -1){
            setDisable("none")
            // alert("You has choosen || now brd is Blocked")
        }else if(choosen_number == -1){
            setDisable("none")
            // alert("number has not beeen  choosen Yet")
        }else{
            setDisable("auto")
            // alert("number has beeen choosen now i need to select")
        }
    },[player,playerId,choosen_number])



    const crossNumber = ( box_num , index ) => {
        
        if( playerId == socket.id && choosen_number == -1 ) {
            if(allCrossedNumber.includes(box_num)) return ;
            console.log("sending choosen number" + box_num +" " + roomid )
            console.log( roomid )
            socket.emit('set choosen number', {roomid : roomid.roomid , box_num } , (res)=>{
                console.log(res)
            });

            socket.emit('cross number',({roomid : roomid.roomid ,box_num}),(res)=>{
                console.log(res)
            });

        }else{

            if(box_num != choosen_number){
                return
            }

            socket.emit('cross number',({roomid : roomid.roomid ,box_num}),(res)=>{
                console.log(res)
            });

        }
  
    }

    useEffect(()=>{
        console.log(allCrossedNumber)
    },[allCrossedNumber])

    useEffect(()=>{
        socket.on('game state',({board})=>{
            setBoard(board)
        })
    },[])



    return ( 
        <>
            <div>
                <div className="grid grid-cols-5 gap-2">

                {
                    gameBoard.map((box_num, index) => (
                        <div 
                            onClick={() => crossNumber(box_num, index)} 
                            key={index} 
                            className={`${choosen_number === box_num ? 'bg-green-500' : (allCrossedNumber.includes(box_num) ? 'bg-blue-500' : 'bg-red-500')} size-16 rounded-3xl border pointer-events-${disable}`}
                        >
                            <div className="size-full flex items-center justify-center text-xl font-bold">
                                {box_num}
                            </div>
                        </div>
                    ))
                }


                </div>



                
            </div>
        </>
    )

}

export default GameBoard;