import actionTypes from '../actionTypes';

interface NewMovePayload {
    newPosition: any;
}

export const makeNewMove = ({newPosition}: NewMovePayload) => {
    return {
        type: actionTypes.NEW_MOVE,
        payload: {newPosition},
    }
}

export const clearCandidates = () => {
    return {
        type: actionTypes.CLEAR_CANDIDATE_MOVES,
    }
}

interface GenerateCandidatesPayload {
    candidateMoves: any;
}

export const generateCandidates = ({candidateMoves}: GenerateCandidatesPayload) => {
    return {
        type: actionTypes.GENERATE_CANDIDATE_MOVES,
        payload: {candidateMoves}
    }
}

export const takeBack = () => {
    return {
        type: actionTypes.TAKE_BACK,
    }
}