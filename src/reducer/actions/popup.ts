import actionTypes from '../actionTypes';

interface PromotionPayload {
    rank: number;
    file: number;
    x: number;
    y: number;
}

export const openPromotion = ({rank, file, x, y}: PromotionPayload) => {
    return {
        type: actionTypes.PROMOTION_OPEN,
        payload: {rank, file, x, y}
    }
}

export const closePopup = () => {
    return {
        type: actionTypes.PROMOTION_CLOSE,
    }
}