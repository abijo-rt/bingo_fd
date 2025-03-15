import { useEffect, useState } from "react";
import socket from "../socket";

const count_row_col = (setRow, setCol, index) => {


    let rowIndex = Math.floor(index / 5);
    let colIndex = index % 5;

    setRow(prev => {
        const newRow = [...prev];
        newRow[rowIndex] += 1;
        return newRow;
    });

    setCol(prev => {
        const newCol = [...prev];
        newCol[colIndex] += 1;
        return newCol;
    });

    
};


const GameBoard = ({roomid,cusAlert}) => {

    const [gameBoard,setBoard] = useState([])
    const [ player,setPlayer ] = useState("");
    const [ playerId,setPlayerId ] = useState("");
    const [choosen_number, setNum ] = useState(-1);
    const [gameStatus , setGameStatus] = useState(false);
    const [btn,setBtn] = useState("red");
    const [disable,setDisable] = useState("none");
    const [allCrossedNumber,setAllCrossedNumber] = useState([])
    const [row,setRow] = useState(Array(5).fill(0));
    const [col,setCol] = useState(Array(5).fill(0));
    const [TotalCount,setTotalCount] = useState(0);


    const intisocket = () => {  

        console.log("ROOOOM !!!" + roomid)

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
            if(res.status == 'game start') setGameStatus(true)
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

            socket.emit('set choosen number', {roomid : roomid , box_num } , (res)=>{
                console.log(res)
            });

            socket.emit('cross number',({roomid : roomid ,box_num}),(res)=>{
                console.log(res)    
            });
            
            setDisable("none");
            
            
        } else {
            
            if(box_num != choosen_number){
                return
            }
            
            // alert("cross")
            socket.emit('cross number',({roomid : roomid ,box_num}),(res)=>{
                console.log(res)
            });
            
            setDisable("none");
            
            
        }
        count_row_col(setRow,setCol,index);
    }

    const startGame = () => {
        console.log(roomid)
        socket.emit('init game', {roomid : roomid} ,(res)=>{
            console.log(res)
        });
    }

    const Bingo = () => {
        cusAlert(1)
        // cusAlert(1)

        // socket.emit('Bingo', {roomid : roomid} ,(res)=>{
        //     console.log(res)
        // });
    }


    useEffect(()=>{
        console.log(row)
        console.log(col)
        console.log(TotalCount)
 
        let count = row.filter(val => val === 5).length + col.filter(val => val === 5).length;
        if(count === 5 ) alert("YOUR ARE THE WINNER")
        setTotalCount(count)
    },[row,col])

    useEffect(()=>{
        socket.on('game state',({board})=>{
            console.log(board)
            setBoard(board)
        })
    },[])



    return ( 
        <>
            <div className="space-y-10 flex flex-col w-[60%] h-full items-center">
                <div className={` ${gameStatus ? 'display' : 'hidden' } indie-flower grid grid-cols-5 gap-2  w-fit h-fit border-4 border-b-8 border-r-8 rounded-4xl p-4 bg-yellow-400 border-amber-900 `}>
                {
                    gameBoard.map((box_num, index) => (

                            <div 
                                onClick={() => crossNumber(box_num, index)} 
                                key={index} 
                                className={`
                                    ${choosen_number === box_num ? 'bg-green-500 border-green-900 animate-pulse' 
                                    : allCrossedNumber.includes(box_num) ? 'bg-red-400 border-red-900' 
                                    : 'bg-blue-400 border-blue-900'} 
                                    size-16 rounded-3xl border-4 
                                    ${disable === 'none' ? 'pointer-events-none' : 'pointer-events-auto'}
                                `}
                            >
                            <div className="size-full flex items-center justify-center text-xl font-bold">
                                {box_num}
                            </div>
                        </div>
                    ))
                }
                </div>
                
                <div className=' p-5 w-full h-fit  text-2xl flex items-center justify-center text-[#211C84]'>
                    
                    <div class={` ${gameStatus ? 'hidden' : 'display' } btn-3d bg-blue-500 border-blue-400 `}  >
                          <button onClick={()=>startGame()} class='    w-full h-full flex flex-col justify-center items-center  font-bold text-lg text-white  '>
                                <span >START GAME</span>
                          </button>
                    </div> 
    
                    <div class={`${gameStatus ? 'display' : 'hidden' } btn-3d bg-yellow-300 border-yellow-500  `}  >
                          <button onClick={()=>Bingo()} class='flex  text-xl w-full h-full  justify-center items-center  font-extrabold  text-amber-900  '>
                                <span className={`${ TotalCount >= 1  ? 'animate-bounce' : '' }`} >B</span>
                                <span className={`${ TotalCount >= 2  ? 'animate-bounce' : '' }`} >I</span>
                                <span className={`${ TotalCount >= 3  ? 'animate-bounce' : '' }`} >N</span>
                                <span className={`${ TotalCount >= 4  ? 'animate-bounce' : '' }`} >G</span>
                                <span className={`${ TotalCount >= 5  ? 'animate-bounce' : '' }`} >O</span>
                          </button>
                    </div> 
    
    
                </div>

                
                
                
            </div>
        </>
    )

}

export default GameBoard;