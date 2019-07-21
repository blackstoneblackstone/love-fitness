import { httpGet } from '../../utils/http'
import { browserHistory } from 'react-router'

const INIT_TRAINER = 'INIT_TRAINER'
const TUANKE = 'TUANKE'
const SIJIAO = 'SIJIAO'
const HREF_TIMES = 'HREF_TIMES'

export const modulesFunction = {
  initTrainer: () => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=initTeacher',
        {userid: window.userid},
        INIT_TRAINER,
        dispatch)
    }
  },
  initCourses: () => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=initTeacher',
        {userid: window.userid},
        INIT_TRAINER,
        dispatch)
    }
  },
  tuankesClick: () => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=tuankes',
        {userid: window.userid},
        TUANKE,
        dispatch)
    }
  },
  sijiaosClick: () => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=sijiaos',
        {userid: window.userid},
        SIJIAO,
        dispatch)
    }
  },
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INIT_TRAINER]: (state, action) => {
    if (action.res.status) {
      return {...state, trainer: action.res.trainer, tuankes: action.res.courses, pageState: 'show'}
    } else {
      let inter = setInterval(() => {
        state.hrefTimes--;
        action.dispatch({
          type:HREF_TIMES,
          hrefTimes: state.hrefTimes
        })
        if (state.hrefTimes < 1) {
          clearInterval(inter)

          browserHistory.push('/vip')
        }
      }, 1000)
      return {...state, pageState: 'error'}
    }
  },
  [HREF_TIMES]: (state, action) => {
    return {...state, hrefTimes: action.hrefTimes}
  },
  [TUANKE]: (state, action) => {
    return {...state, tuankes: action.res.data}
  },
  [SIJIAO]: (state, action) => {
    return {...state, sijiaos: action.res.data}
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  trainer: {
    headimg: ''
  },
  tuankes: [],
  sijiaos: [],
  pageState: 'loading',
  hrefTimes: 5
}
export default function trainerReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
