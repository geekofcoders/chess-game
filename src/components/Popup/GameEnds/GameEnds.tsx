import React, { FC } from 'react';
import { Status } from '../../../constants';
import { useAppContext } from '../../../contexts/Context';
import { setupNewGame } from '../../../reducer/actions/game';
import './GameEnds.css';

interface GameEndsProps {
  onClosePopup: () => void;
}

const GameEnds: FC<GameEndsProps> = ({ onClosePopup }) => {
  const { appState: { status }, dispatch } = useAppContext();

  if (status === Status.ongoing || status === Status.promoting) {
    return null;
  }

  const newGame = (): void => {
    dispatch(setupNewGame());
  };

  const isWin: boolean = status.endsWith('wins');

  return (
    <div className="popup--inner popup--inner__center">
      <h1>{isWin ? status : 'Draw'}</h1>
      <p>{!isWin && status}</p>
      <div className={`${status}`} />
      <button onClick={newGame}>New Game</button>
    </div>
  );
};

export default GameEnds;