import React, { FC } from 'react';
import './App.css';
import Board from './components/Board/Board';
import { useDispatch, useSelector } from 'react-redux';
import AppContext from './contexts/Context';
import Control from './components/Control/Control';
import TakeBack from './components/Control/bits/TakeBack';
import MovesList from './components/Control/bits/MovesList';

interface AppState {
  piece: any; // Replace 'any' with the actual type of 'state.piece'
}

const App: FC = () => {
  const appState = useSelector((state: AppState) => state.piece);
  const dispatch = useDispatch();

  const providerState = {
    appState,
    dispatch,
  };

  return (
    <AppContext.Provider value={providerState}>
      <div className="App">
        <Board />
        <Control>
          <MovesList />
          <TakeBack />
        </Control>
      </div>
    </AppContext.Provider>
  );
}

export default App;