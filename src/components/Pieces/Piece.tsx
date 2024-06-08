import React, { FC } from 'react';
import arbiter from '../../arbiter/arbiter';
import { useAppContext } from '../../contexts/Context';
import { generateCandidates } from '../../reducer/actions/move';

interface PieceProps {
  rank: any;
  file: any;
  piece: string;
}

const Piece: FC<PieceProps> = ({
  rank,
  file,
  piece,
}) => {

  const { appState, dispatch } = useAppContext();
  const { turn, castleDirection, position: currentPosition } = appState;

  const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", `${piece},${rank},${file}`);
    setTimeout(() => {
      e.currentTarget.style.display = 'none';
    }, 0);

    if (turn === piece[0]) {
      const candidateMoves = arbiter.getValidMoves({
        position: currentPosition[currentPosition.length - 1],
        prevPosition: currentPosition[currentPosition.length - 2],
        castleDirection: castleDirection[turn],
        piece,
        file,
        rank
      });
      dispatch(generateCandidates({ candidateMoves }));
    }
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.display = 'block';
  };

  return (
    <div
      className={`piece ${piece} p-${file}${rank}`}
      draggable={true}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    />
  );
};

export default Piece;