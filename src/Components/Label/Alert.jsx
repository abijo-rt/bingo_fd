import { useEffect ,useState } from "react";
import { WarningCircle ,Trophy } from "phosphor-react";

const PlayerJoinedAlert = ({onClose}) => {

    const [fade, setFade] = useState("opacity-0");

    useEffect(()=>{

        setTimeout(() => setFade("opacity-100"), 100);

        const fadeOutTimer = setTimeout(() => {
          setFade("opacity-0");
        }, 2000);

        const timer = setTimeout(() => {
            setFade("opacity-0")
            onClose(false)
        }, 2500);

        return ()=>{
            clearTimeout(timer)
            clearTimeout(fadeOutTimer)
        }

    },[])


  return (
    <div className={`absolute  shadow-2xl  top-0 right-20 indie-flower  w-fit min-w-96 h-15  border-2 border-green-600 border-r-4  border-b-4  bg-green-100 rounded-lg flex ${fade} transition-opacity duration-300`} >
            <div className="h-full w-15 flex items-center justify-center ">
            <WarningCircle size={32} color="#00a63e"  />
            </div>
            <div className="h-full flex flex-grow items-center justify-ṣtart pl-1 text-md font-semibold text-green-600 ">
                <span>New Player have joined the room . </span>
            </div>
      </div>
  );
};

const RoomNotFoundAlert = ({onClose}) => {

  const [fade, setFade] = useState("opacity-0");

  useEffect(()=>{

      setTimeout(() => setFade("opacity-100"), 100);

      const fadeOutTimer = setTimeout(() => {
        setFade("opacity-0");
      }, 2000);

      const timer = setTimeout(() => {
          setFade("opacity-0")
          onClose(false)
      }, 2500);

      return ()=>{
          clearTimeout(timer)
          clearTimeout(fadeOutTimer)
      }

  },[])

  return (
    <>
      <div className={`  indie-flower absolute top-20 right-20 w-96 h-15  border-2 border-red-600 border-r-4  border-b-4  bg-red-100 rounded-lg flex ${fade} transition-opacity duration-300`} >
            <div className="h-full w-15 flex items-center justify-center ">
            <WarningCircle size={32} color="#e7000b"  />
            </div>
            <div className="h-full flex flex-grow items-center justify-ṣtart pl-1 text-md font-semibold text-red-600 ">
                <span>ROOM NOT FOUND </span>
            </div>
      </div>
    </>
  )

}

const WinnerAlert = ({onClose}) => {

  const [fade, setFade] = useState("opacity-0");

  useEffect(()=>{

      setTimeout(() => setFade("opacity-100"), 100);

      const fadeOutTimer = setTimeout(() => {
        setFade("opacity-0");
      }, 2000);

      const timer = setTimeout(() => {
          setFade("opacity-0")
          onClose(false)
      }, 2500);

      return ()=>{
          clearTimeout(timer)
          clearTimeout(fadeOutTimer)
      }

  },[])

  return (
    <>
      <div className={` flex-col indie-flower absolute top-[10%] w-96 h-50  brd-3d-4 border-[#C08B5C] text-[#C08B5C]  bg-[#FCF596] rounded-lg flex ${fade} transition-opacity duration-300`} >
            <div className=" text-2xl font-bold h-20 w-full flex items-center justify-center space-x-2 "> <span>GAME OVER</span> </div>
            <div className="w-full flex flex-grow item-center justify-center text-xl font-bold space-x-2">
              <Trophy size={32} color="#C08B5C" weight="duotone" /> <span className="text-center"> YOU HAVE WON THE MATCH</span>
            </div>
            <div className="w-full flex h-fit p-5 items-center justify-center">
                    <button className=" btn-3d bg-blue-300 " >OK</button>
            </div>
      </div>
    </>
  )

}

export  {RoomNotFoundAlert,PlayerJoinedAlert,WinnerAlert};
