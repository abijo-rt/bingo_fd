import CreateRoom from "../Components/CreateRoom";
import { useState } from "react";
import { RoomNotFoundAlert } from "../Components/Label/Alert";

const Home = () => {

    const [RNFALert , setRNFAlert] = useState(false)

    const  cusAlert = (alert_no) => {
        if(alert_no === 1) setRNFAlert(true)
    }

    return (
        <>  
            {RNFALert && <RoomNotFoundAlert onClose={setRNFAlert} />}
            <CreateRoom cusAlert = {cusAlert} />
        </>
    )
}

export default Home ;