import { httpGet } from '../../../utils/http'
import { deepCopy } from '../../../utils'

import { USER_INFO } from '../../../store/userinfo'

export const JS_RECORD = 'JS_RECORD'
export const BUY_CARD = 'BUY_CARD'
export const WX_PAY = 'WX_PAY'
export const NOTIFY_STATE = 'NOTIFY_STATE'
export const WX_PAY_RESULT = 'WX_PAY_RESULT'
export const MY_CARD = 'MY_CARD'
export const COURSE_ORDER = 'COURSE_ORDER'
export const COURSE_LIST = 'COURSE_LIST'
export const COUNTER_DOUBLE_ASYNC = 'COUNTER_DOUBLE_ASYNC'
export const ORDER_BUTTON_LOAD = 'ORDER_BUTTON_LOAD'
export const COURSE_USE_CARDS = 'COURSE_USE_CARDS'
export const CARD_BUY_COURSE = 'CARD_BUY_COURSE'
export const COURSE_NOTIFY_CLOSE = 'COURSE_NOTIFY_CLOSE'
export const CANCEL_ORDER = 'CANCEL_ORDER'
export const COURSE_TYPES = 'COURSE_TYPES'
export const JS_ECHART = 'JS_ECHART'
export const INIT_TEACHER = 'INIT_TEACHER'

export function initTeacher () {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Trainer&a=teachers', {},
      INIT_TEACHER
      , dispatch)
  }
}
export function jsEchartClick () {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Course&a=courseTypes', {},
      JS_ECHART
      , dispatch)
  }
}
export function courseTypeClick () {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Course&a=courseTypes', {},
      COURSE_TYPES
      , dispatch)
  }
}
export function cancelOrderClick (courseId) {
  console.log(courseId)
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Oauth&a=cancelOrderCourse',
      {courseId: courseId, userId: window.userid},
      CANCEL_ORDER
      , dispatch)
  }
}
export function orderAction (courseId) {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Course&a=order',
      {userId: window.userid, courseId: courseId},
      COURSE_ORDER,
      dispatch)
  }
}

export function coursesAction (day = new Date().getDay()) {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Course&a=clist',
      {day: day, userId: window.userid},
      COURSE_LIST
      , dispatch)
  }
}
export function cardBuyCourseClick (courseId, cardId) {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Course&a=cardBuyCourse',
      {userId: window.userid, courseId: courseId, cardId: cardId},
      CARD_BUY_COURSE,
      dispatch)
  }
}

export const myCardClick = () => {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Vip&a=mycard',
      {userid: window.userid},
      MY_CARD, dispatch)
  }
}
export const myJsClick = () => {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Vip&a=jsrecord',
      {userId: window.userid},
      JS_RECORD, dispatch)
  }
}
export const buyCardClick = () => {
  return (dispatch, getState) => {
    httpGet(
      'index.php?g=Restful&m=Vip&a=cardlist', {},
      BUY_CARD, dispatch)
  }
}
export const bindingClick = (tel, truename) => {
  return (dispatch, getState) => {
    httpGet(
      'index.php?g=Restful&m=Vip&a=binding',
      {tel: tel, truename: truename, openid: getState().userInfo.openid},
      USER_INFO, dispatch)
  }
}
export const buyClick = (price, cardId, cardName) => {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Vip&a=buyCard',
      {openid: getState().userInfo.openid, price: price, cardid: cardId, cardname: cardName},
      WX_PAY, dispatch)
  }
}
export const closeNotification = () => {
  return (dispatch, getState) => {
    dispatch({
      type: NOTIFY_STATE
    })
  }
}
export function useCardsClick (courseId, k) {
  return (dispatch, getState) => {
    httpGet('index.php?g=Restful&m=Course&a=useCards',
      {userId: window.userid, courseId: courseId},
      COURSE_USE_CARDS,
      dispatch)
  }
}

const ACTION_HANDLERS = {
  [JS_RECORD]: (state, action) => {
    return {
      ...state,
      jsTimeLine: action.res.data,
      buyState: 0,
    }
  },
  [BUY_CARD]: (state, action) => {
    return {
      ...state,
      cards: action.res.data,
      buyState: 0,
    }
  },
  [WX_PAY]: (state, action) => {
    if (!action.res.status) {
      setTimeout(function () {
        action.dispatch({
          type: NOTIFY_STATE,
        })
      }, 2000)
      return {
        ...state,
        msg: action.res.msg,
        buyState: 1,
      }
    }
    const jsApiCall = () => {
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        action.res.data,
        function (res) {
          setTimeout(function () {
            action.dispatch({
              type: NOTIFY_STATE,
            })
          }, 2000)
          if (res.err_msg == 'get_brand_wcpay_request:ok') {
            action.dispatch({
              type: WX_PAY_RESULT,
              msg: '购买成功',
              buyState: 2
            })
          } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
            action.dispatch({
              type: WX_PAY_RESULT,
              msg: '不想买了',
              buyState: 1
            })
          } else {
            action.dispatch({
              type: WX_PAY_RESULT,
              msg: '购买失败',
              buyState: 1
            })
          }
        }
      )
    }
    if (typeof WeixinJSBridge == 'undefined') {
      if (document.addEventListener) {
        //alert('WeixinJSBridgeReady');
        document.addEventListener('WeixinJSBridgeReady', jsApiCall, false)
      } else if (document.attachEvent) {
        //alert('onWeixinJSBridgeReady');
        document.attachEvent('WeixinJSBridgeReady', jsApiCall)
        document.attachEvent('onWeixinJSBridgeReady', jsApiCall)
      }
    } else {
      jsApiCall()
    }
    return {
      ...state,
      buyState: 0,
    }
  },
  [NOTIFY_STATE]: (state, action) => {
    return {
      ...state,
      buyState: 0,
    }
  },
  [WX_PAY_RESULT]: (state, action) => {
    return {
      ...state,
      buyState: action.buyState,
    }
  },
  [MY_CARD]: (state, action) => {
    return {
      ...state,
      mycards: action.res.data,
      buyState: 0,
    }
  },

  [COURSE_LIST]: (state, action) => {
    return {
      ...state,
      courses: action.res.data,
      buyState: 0,
    }
  },
  [COURSE_ORDER]: (state, action) => {
    var courses = []
    if (action.res.status) {
      for (var i = 0; i < state.courses.length; i++) {
        if (state.courses[i].id == action.res.courseId) {
          state.courses[i].isOrder = true
          state.courses[i].ccpeople = parseInt(state.courses[i].ccpeople) + 1
          state.courses[i].headimgs.push(action.res.headimg)
        }
        courses.push(state.courses[i])
      }
      return {
        ...state,
        courses: courses,
        orderStatus: 0,
        buyState: 0
      }
    } else {
      return state
    }
  },
  [ORDER_BUTTON_LOAD]: (state, action) => {
    let buttonLoads = []
    for (var i = 0; i < state.courses.length; i++) {
      if (action.k == i && action.ctype == 0) {
        buttonLoads.push(true)
      } else {
        buttonLoads.push(false)
      }
    }
    return {
      ...state,
      orderStatus: 0,
      buttonLoads: buttonLoads,
    }
  },
  [COURSE_USE_CARDS]: (state, action) => {
    return {
      ...state,
      useCards: action.res.data,
      orderStatus: 0,
    }
  },
  [CARD_BUY_COURSE]: (state, action) => {
    setTimeout(function () {
      action.dispatch({
        type: COURSE_NOTIFY_CLOSE
      })
    }, 3000)
    if (action.res.status) {
      return {
        ...state,
        courses: action.res.data,
        msg: action.res.msg,
        orderStatus: 1,
        buyState: 3,
      }
    } else {
      return {
        ...state,
        msg: action.res.msg,
        orderStatus: 2,
        buyState: 4,
      }
    }
  },
  [COURSE_NOTIFY_CLOSE]: (state, action) => {
    return {
      ...state,
      orderStatus: 0,
      buyState: 0
    }
  },
  [CANCEL_ORDER]: (state, action) => {
    setTimeout(function () {
      action.dispatch({
        type: COURSE_NOTIFY_CLOSE
      })
    }, 3000)
    return {
      ...state,
      orderStatus: 0,
      msg: action.res.msg,
      jsTimeLine: action.res.data,
      buyState: 5,
    }
  },
  [COURSE_TYPES]: (state, action) => {
    return {
      ...state,
      courseTypes: action.res.data
    }
  },
  [JS_ECHART]: (state, action) => {
    return {
      ...state,
      courseTypes: action.res.data
    }
  },
  [INIT_TEACHER]: (state, action) => {
    return {
      ...state,
      teachers: action.res.data
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  jsTimeLine: [],
  cards: {times: [], month: []},
  buyState: 0,
  mycards: [],
  courses: [],
  buttonLoads: [],
  useCards: [],
  courseTypes: [],
  msg: 'tip',
  teachers: [{
    tname: '张冠',
    tdesc: '',
    headimg: 'http://wx.qlogo.cn/mmopen/L3tNovvic0biaVhdsr3xLaYMZgWkl1KSjM6VMDOuaAsmsqImCp8lVSAYiaQ4Xx9Wj54h81ZNf2yAkZ6tg3EpW03AOGsaykjA6cP/0'
  }, {
    tname: '张冠',
    tdesc: '',
    headimg: 'http://wx.qlogo.cn/mmopen/L3tNovvic0biaVhdsr3xLaYMZgWkl1KSjM6VMDOuaAsmsqImCp8lVSAYiaQ4Xx9Wj54h81ZNf2yAkZ6tg3EpW03AOGsaykjA6cP/0'
  }],
  jsEchart: {
    legend: {
      show: false,
      data: ['健身时间']
    },
    toolbox: {
      show: false
    },
    grid: {
      show: false,
      top: '1%',
      left: '1%',
      right: '1%',
      bottom: '1%'
    },
    xAxis: [
      {
        show: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }
    ],
    yAxis: [
      {
        show: false,
        type: 'value'
      }
    ],
    series: [
      {
        name: '健身时间',
        type: 'line',
        stack: '总量',
        areaStyle: {normal: {}},
        data: [120, 132, 101, 134, 90, 230, 210]
      }
    ]
  }
}
export default function vipReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
