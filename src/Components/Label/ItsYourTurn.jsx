

const ItsYourTurn = () => {

    return (
        <>
            <div className=" "> Its your Turn </div>
        </>
    )
}

const PlayerIsChoosing = ({name}) => {

    return (
        <>
            <div className=" "> {name} is Choosing ... </div>
        </>
    )
}

const PlayerHasChoosen = ({name,num}) => {

    return (
        <>
            <div className=" "> {name} have choosen {num}</div>
        </>
    )
}

const YouHaveChoosen = ({num}) => {

    return (
        <>
            <div className=" "> You have choosen {num}</div>
        </>
    )
}

export  {ItsYourTurn , PlayerHasChoosen , PlayerIsChoosing ,YouHaveChoosen} ;