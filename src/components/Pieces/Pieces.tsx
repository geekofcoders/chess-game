import React, { FC, useRef } from 'react';
import './Pieces.css';
import Piece from './Piece';
import { useAppContext } from '../../contexts/Context';
import { openPromotion } from '../../reducer/actions/popup';
import { getCastlingDirections } from '../../arbiter/getMoves';
import { updateCastling, detectStalemate, detectInsufficientMaterial, detectCheckmate } from '../../reducer/actions/game';
import { makeNewMove, clearCandidates } from '../../reducer/actions/move';
import arbiter from '../../arbiter/arbiter';
// import { getNewMoveNotation } from '../../helper';

// interface Coords {
//   x: number;
//   y: number;
// }

interface PromotionBoxProps {
  rank: any;
  file: any;
  x: number;
  y: number;
}

const Pieces: FC = () => {
  const { appState, dispatch } = useAppContext();
  const currentPosition = appState.position[appState.position.length - 1];

  const ref = useRef<HTMLDivElement>(null);

  const updateCastlingState = ({ piece, file, rank }: { piece: string; file: any; rank: any }) => {
    const direction = getCastlingDirections({
      castleDirection: appState.castleDirection,
      piece,
      file,
      rank,
    });
    if (direction) {
      dispatch(updateCastling(direction));
    }
  };

  const openPromotionBox = ({ rank, file, x, y }: PromotionBoxProps) => {
    dispatch(openPromotion({ rank: Number(rank), file: Number(file), x, y }));
  };

  const calculateCoords = (e: React.MouseEvent<HTMLDivElement>) => {
    const { top, left, width } = ref.current!.getBoundingClientRect();
    const size = width / 8;
    const y = Math.floor((e.clientX - left) / size);
    const x = 7 - Math.floor((e.clientY - top) / size);

    return { x, y };
  };

  const move = (e: React.DragEvent<HTMLDivElement>) => {
    const { x, y } = calculateCoords(e);
    const [piece, rank, file] = e.dataTransfer.getData('text').split(',');

    if (appState.candidateMoves.find((m: number[]) => m[0] === x && m[1] === y)) {
      const opponent = piece.startsWith('b') ? 'w' : 'b';
      const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'white' : 'black'}`];

      if ((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)) {
        openPromotionBox({ rank, file, x, y });
        return;
      }
      if (piece.endsWith('r') || piece.endsWith('k')) {
        updateCastlingState({ piece, file: Number(file), rank: Number(rank) });
      }
      const newPosition = arbiter.performMove({
        position: currentPosition,
        piece,
        rank: Number(rank),
        file: Number(file),
        x,
        y,
      });
    //   const newMove = getNewMoveNotation({
    //     piece,
    //     rank: Number(rank),
    //     file: Number(file),
    //     x,
    //     y,
    //     position: currentPosition,
    //   });
      dispatch(makeNewMove({ newPosition}));

      if (arbiter.insufficientMaterial(newPosition)) dispatch(detectInsufficientMaterial());
      else if (arbiter.isStalemate(newPosition, opponent, castleDirection)) {
        dispatch(detectStalemate());
      } else if (arbiter.isCheckMate(newPosition, opponent, castleDirection)) {
        dispatch(detectCheckmate(piece[0]));
      }
    }
    dispatch(clearCandidates());
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    move(e);
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className='pieces' ref={ref} onDrop={onDrop} onDragOver={onDragOver}>
      {currentPosition.map((r:any, rank:number) =>
        r.map((f:any, file:number) =>
          currentPosition[rank][file] ? (
            <Piece key={rank + '-' + file} rank={rank} file={file} piece={currentPosition[rank][file]} />
          ) : null
        )
      )}
    </div>
  );
};

export default Pieces;