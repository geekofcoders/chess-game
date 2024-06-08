import { createPosition } from './helper'

export const Status = {
    ongoing: 'Ongoing',
    promoting: 'Promoting',
    white: 'White wins',
    black: 'Black wins',
    stalemate: 'Game draws due to stalemate',
    insufficient: 'Game draws due to insufficient material',
}

interface GameState {
    position: string[][][];
    turn: string;
    candidateMoves: number[][];
    movesList: any;

    promotionSquare: any;
    status: string;
    castleDirection:any
}

export const initGameState: GameState = {
    position: [createPosition()],
    turn: 'w',
    candidateMoves: [],
    movesList: [],

    promotionSquare: null,
    status: Status.ongoing,
    castleDirection: {
        w: 'both',
        b: 'both'
    },
}