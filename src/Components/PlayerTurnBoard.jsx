import { useEffect, useState } from "react";
import socket from "../socket";
import {
  ItsYourTurn,
  PlayerHasChoosen,
  PlayerIsChoosing,
  YouHaveChoosen,
} from "./Label/ItsYourTurn";

const PlayerTurnBoard = ({ roomid }) => {
  const [player, setPlayer] = useState("");
  const [playerid, setPlayerId] = useState("");
  const [num, setNum] = useState(-1);
  const [gameStatus, setGameStatus] = useState("");

  useEffect(() => {
    const initSocket = () => {

      socket.on("player turn", ({ player_turn }) => {
        setPlayer(player_turn.name);
        setPlayerId(player_turn.id);
        setNum(player_turn.choosen_number);
      });

      socket.on("number choosen", (choosen_number) => {
        setNum(choosen_number);
      });

      socket.emit("get init game status", { roomid }, (res) => {
        console.log(res);
        if (res.status) setGameStatus(res.gameStatus);
      });

      socket.on("listen to game status", (res) => {
        setGameStatus(res);
      });
    };

    initSocket();

    return () => {
      socket.off("player turn");
      socket.off("number choosen");
      socket.off("listen to game status");
    };
  }, []);

  return (
    <div className="gluten-500 text-3xl">
      {gameStatus === "lobby" ? (
        <> Match is not started </>
      ) : (
        <div className="">
          {playerid === socket.id && num === -1 ? (
            <ItsYourTurn />
          ) : (
            <div>
              {playerid === socket.id ? (
                <YouHaveChoosen num={num} />
              ) : num === -1 ? (
                <PlayerIsChoosing name={player} />
              ) : (
                <PlayerHasChoosen name={player} num={num} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerTurnBoard;
