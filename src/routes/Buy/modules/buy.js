import {httpGet} from '../../../utils/http'
export const GET_CARD = 'GET_CARD'
export const INIT_ACTION_HANDLERS = 'INIT_ACTION_HANDLERS'

export const getCardClick = () => {
    return (dispatch, getState) => {
        httpGet("index.php?g=Restful&m=Vip&a=getTry",
            {u: window.userid},
            GET_CARD,
            dispatch);
    }
}

export const initCard = () => {
    return (dispatch, getState) => {
        httpGet("index.php?g=Restful&m=Vip&a=ifTry",
            {u: window.userid},
            INIT_ACTION_HANDLERS,
            dispatch);
    }
}


const ACTION_HANDLERS = {
    [GET_CARD]: (state, action) => {
        if (action.res.status) {
            alert(action.res.msg);
        } else {
            alert(action.res.msg);
        }
        window.location.href = "/course";
        return state;
    },
    [INIT_ACTION_HANDLERS]: (state, action) => {
        if (action.res.status) {
            console.log(action.res.status);
            window.location.href = "/course";
        }
        return state;
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0
export default function counterReducer(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
