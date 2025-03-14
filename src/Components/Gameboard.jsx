import { useEffect, useState } from "react";
import socket from "../socket";

const count_row_col = (setRow, setCol, index, setTotalCount) => {


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

    // setRow(prevRow => {
    //     if (prevRow[rowIndex] === 5) {
    //         setTotalCount(prev => prev + 1);
    //     }
    //     return prevRow;
    // });

    // setCol(prevCol => {
    //     if (prevCol[colIndex] === 5) {
    //         setTotalCount(prev => prev + 1);
    //     }
    //     return prevCol;
    // });
    
};


const GameBoard = (roomid) => {

    const [gameBoard,setBoard] = useState([])
    const [ player,setPlayer ] = useState("");
    const [ playerId,setPlayerId ] = useState("");
    const [choosen_number, setNum ] = useState(-1);
    const [gameStatus , setGameStatus] = useState("");
    const [btn,setBtn] = useState("red");
    const [disable,setDisable] = useState("none");
    const [allCrossedNumber,setAllCrossedNumber] = useState([])
    const [row,setRow] = useState(Array(5).fill(0));
    const [col,setCol] = useState(Array(5).fill(0));
    const [TotalCount,setTotalCount] = useState(0);


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

    useEffect(()=>{

        console.log("ROW"+row)
        console.log("COL"+col)
        console.log("TOTAL NO"+TotalCount)
        if(TotalCount == 5) alert("bingo")

    },[row,col,TotalCount])

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
            
            setDisable("none");
            
            
        } else {
            
            if(box_num != choosen_number){
                return
            }
            
            // alert("cross")
            socket.emit('cross number',({roomid : roomid.roomid ,box_num}),(res)=>{
                console.log(res)
            });
            
            setDisable("none");
            
            
        }
        count_row_col(setRow,setCol,index,setTotalCount);
    }

    // useEffect(()=>{
    //     console.log(disable)
    // },[disable])

    // useEffect(()=>{
    //     console.log(allCrossedNumber)
    // },[allCrossedNumber])

    useEffect(()=>{
        console.log(row)
        console.log(col)
        console.log(TotalCount)
 
        let count = row.filter(val => val === 5).length + col.filter(val => val === 5).length;
        if(count === 5 ) alert("YOUR ARE THE WINNER")
    },[row,col])

    useEffect(()=>{
        socket.on('game state',({board})=>{
            setBoard(board)
        })
    },[])



    return ( 
        <>
            <div className="space-y-10 flex flex-col w-[60%] h-full items-center">
                <div className=" grid grid-cols-5 gap-2  w-fit h-fit border-4 rounded-4xl p-4 bg-yellow-400 border-amber-900">
                {
                    gameBoard.map((box_num, index) => (

                            <div 
                                onClick={() => crossNumber(box_num, index)} 
                                key={index} 
                                className={`
                                    ${choosen_number === box_num ? 'bg-green-500 border-green-900' 
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
                
                <div className="btn-3d-fit  pl-2 pr-2 p-2 gluten-500 w-fit bg-amber-400 h-fit flex items-center justify-center text-4xl ">
                        <span className="">B</span>
                        <span className="">I</span>
                        <span className="">N</span>
                        <span className="">G</span>
                        <span className="">O</span>
                </div>

                
                
                
            </div>
        </>
    )

}

export default GameBoard;