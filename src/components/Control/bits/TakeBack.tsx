import React, { FC, useRef } from "react";
import { useAppContext } from "../../../contexts/Context";
import {
  clearCandidates,
  makeNewMove,
  takeBack,
} from "../../../reducer/actions/move";
import { copyPosition } from "../../../helper";
import arbiter from "../../../arbiter/arbiter";
import { updateturn } from "../../../reducer/actions/game";

const TakeBack: FC = () => {
  const { appState, dispatch } = useAppContext();
  const ref = useRef<HTMLButtonElement>(null);

  //   const player = "w";

  const auto = () => {
    var newPosition = appState.position[appState.position.length - 1];
    var position: string[][] = newPosition;
    var turn: string = "w";
    for (let i = 0; i < 4; i++) {
      let rank = turn === "w" ? 1 : 6;
      let file = Math.floor(Math.random() * 8);
      let dir = Math.floor(Math.random() * 3);
      if (position[rank][file] === "") {
        if (file === 7) {
          file = 6;
        } else if (file === 0) {
          file = 1;
        } else {
          file = file + 1;
        }
      }

      let piece: string = turn + "p";
      let x = 1;
      let y = file;
      if (turn === "w") {
        piece = "wp";
        if (dir === 0) dir = 1;
        x = rank + dir;
        y = file;
      } else {
        // piece = "bp";
        if (dir === 0) dir = 1;
        x = rank - dir;
        y = file;
      }

      //   const newPosition: string[][] = copyPosition(position);

      position = arbiter.performMove({
        position: newPosition,
        piece,
        rank: rank,
        file: file,
        x,
        y,
      });

      //   rank=rank===1?6:1;
      turn = turn === "w" ? "b" : "w";
      newPosition = position;
      dispatch(clearCandidates());
    }
    // newPosition=newPosition1;
    dispatch(makeNewMove({ newPosition }));
    dispatch(updateturn("w"));
    ref.current!.disabled = true;
  };

  return (
    <div>
      <button ref={ref} onClick={auto}>
        Automatic
      </button>
    </div>
  );
};

export default TakeBack;
