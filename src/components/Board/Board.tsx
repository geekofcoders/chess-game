import React, { FC } from 'react';
import './Board.css';
import { useAppContext } from '../../contexts/Context';
import Ranks from './bits/Ranks';
import Files from './bits/Files';
import Pieces from '../Pieces/Pieces';
import PromotionBox from '../Popup/PromotionBox/PromotionBox';
import Popup from '../Popup/Popup';
import GameEnds from '../Popup/GameEnds/GameEnds';
import arbiter from '../../arbiter/arbiter';
import { getKingPosition } from '../../arbiter/getMoves';
import { closePopup } from '../../reducer/actions/popup';


interface BoardProps {}

const Board: FC<BoardProps> = () => {

  const { appState: { status }, dispatch } = useAppContext();

  const onClosePopup = () => {
    dispatch(closePopup());
  };
  const ranks: number[] = Array(8)
    .fill(0)
    .map((x, i) => 8 - i);
  const files: number[] = Array(8)
    .fill(0)
    .map((x, i) => i + 1);

  const { appState } = useAppContext();
  const position = appState.position[appState.position.length - 1];

  const checkTile = (() => {
    const isInCheck: boolean = arbiter.isPlayerInCheck({
      positionAfterMove: position,
      position,
      player: appState.turn,
    });

    if (isInCheck) return getKingPosition(position, appState.turn);

    return null;
  })();

  const getClassName = (i: number, j: number): string => {
    let c: string = 'tile';
    c += (i + j) % 2 === 0 ? ' tile--dark ' : ' tile--light ';
    if (
      appState.candidateMoves?.find((m:number[]) => m[0] === i && m[1] === j)
    ) {
      if (position[i][j]) c += ' attacking';
      else c += ' highlight';
    }

    if (
      checkTile &&
      checkTile[0] === i &&
      checkTile[1] === j
    ) {
      c += ' checked';
    }

    return c;
  };

  return (
    <div className='board'>
      <Ranks ranks={ranks} />

      <div className='tiles'>
        {ranks.map((rank, i) =>
          files.map((file, j) => (
            <div
              key={file + '' + rank}
              className={`${getClassName(7 - i, j)}`}
            ></div>
          ))
        )}
      </div>

      <Pieces />

      <Popup>
        <PromotionBox onClosePopup={onClosePopup}/>
        <GameEnds onClosePopup={onClosePopup}/>
      </Popup>

      <Files files={files} />
    </div>
  );
};

export default Board;