import { useEffect ,useState } from "react";
import { WarningCircle ,XCircle } from "phosphor-react";

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

export  {RoomNotFoundAlert,PlayerJoinedAlert};
