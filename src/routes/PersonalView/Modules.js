import { httpGet } from '../../utils/http'
const TIME_TAB = 'TIME_TAB'
const TRAINER = 'TRAINER'
const USER_CARD = 'USER_CARD'
const OREDER_TEACHER = 'OREDER_TEACHER'
const NOTIFY_MSG = 'NOTIFY_MSG'
let notifyTimeOut = null
export const modulesFunction = {
  initTrainer: (id) => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=teacher',
        {id: id},
        TRAINER,
        dispatch)
    }
  },
  timeTabClick: (teacherid, day) => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=teacherTime',
        {teacherid: teacherid, day: day},
        TIME_TAB,
        dispatch)
    }
  },
  useCardAction: () => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=trainer&a=useCards',
        {userid: window.userid},
        USER_CARD,
        dispatch)
    }
  },
  orderTeacher: (cardId, teacherId, timeId, day) => {
    return (dispatch, getState) => {
      httpGet('index.php?g=Restful&m=oauth&a=orderTeacher',
        {userid: window.userid, teacherid: teacherId, date: day, timeid: timeId, cardid: cardId},
        OREDER_TEACHER,
        dispatch)
    }
  }
}

const ACTION_HANDLERS = {
  [TRAINER]: (state, action) => {
    if (action.res.status) {
      return {...state, trainer: action.res.data.trainer, times: action.res.data.times}
    } else {
      return state
    }
  },
  [TIME_TAB]: (state, action) => {
    if (action.res.status) {
      return {...state, times: action.res.data}
    } else {
      return state
    }
  },
  [USER_CARD]: (state, action) => {
    if (action.res.status) {
      return {...state, useCards: action.res.data}
    } else {
      return state
    }
  },
  [OREDER_TEACHER]: (state, action) => {
    clearTimeout(notifyTimeOut)
    notifyTimeOut = setTimeout(function () {
      action.dispatch(
        {
          type: NOTIFY_MSG
        }
      )
    }, 3000)
    if (action.res.status) {
      return {...state, times: action.res.times, notifyMsg: action.res.msg}
    }
    return {...state, notifyMsg: action.res.msg}
  },
  [NOTIFY_MSG]: (state, action) => {
    return {...state, notifyMsg: '0'}
  },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  trainer: {
    name: 1,
    headerimg: 'http://gm.wujiesheying.com/data/upload/admin/20170518/591db27ab4166.jpeg'
  },
  times: [],
  useCards: [],
  notifyMsg: '0'
}
export default function counterReducer (state = initialState, action) {

  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
