import React, { FC } from 'react';
import { useAppContext } from '../../../contexts/Context';
import './MovesList.css';

const MovesList: FC = () => {
    const { appState: { movesList } } = useAppContext();

    return <div className='moves-list'>
        {movesList.map((move: string, i: number) =>
            <div key={i} data-number={Math.floor(i / 2) + 1}>{move}</div>
        )}
    </div>
}

export default MovesList;