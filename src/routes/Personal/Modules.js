import {httpGet} from '../../utils/http'
export const GET_CARD = 'GET_CARD'
const TRAINERS = 'TRAINERS'

export const modulesFunction = {
    initTrainers: () => {
        return (dispatch, getState) => {
            httpGet("index.php?g=Restful&m=trainer&a=teachers",
                {},
                TRAINERS,
                dispatch);
        }
    }
}


const ACTION_HANDLERS = {
    [TRAINERS]: (state, action) => {
        if (action.res.status) {
            return {...state, trainers: action.res.data};
        } else {
            return state;
        }
    }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
    trainers: [{
        name: 1,
        headerimg: "http://www.gm-fitness.com/data/upload/admin/20170518/591db27ab4166.jpeg"
    }, {
        name: 1,
        headerimg: "http://www.gm-fitness.com/data/upload/admin/20170518/591db27ab4166.jpeg"
    }]
}
export default function counterReducer(state = initialState, action) {

    const handler = ACTION_HANDLERS[action.type]

    return handler ? handler(state, action) : state
}
