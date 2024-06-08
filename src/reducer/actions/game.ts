import actionTypes from '../actionTypes';
import { initGameState } from '../../constants';

export const updateCastling = (direction: string) => {
    return {
        type: actionTypes.CAN_CASTLE,
        payload: direction,
    }
}

export const updateturn = (turn: string) => {
    return {
        type: actionTypes.NEW_TURN,
        payload: turn,
    }
}

export const detectStalemate = () => {
    return {
        type: actionTypes.STALEMATE,
    }
}

export const detectInsufficientMaterial = () => {
    return {
        type: actionTypes.INSUFFICIENT_MATERIAL,
    }
}

export const detectCheckmate = (winner: string) => {
    return {
        type: actionTypes.WIN,
        payload : winner
    }
}

export const setupNewGame = () => {
    return {
        type: actionTypes.NEW_GAME,
        payload : initGameState
    }
}