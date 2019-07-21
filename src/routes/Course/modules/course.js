import {httpGet, httpPost} from '../../../utils/http'
export const COURSE_ORDER = 'COURSE_ORDER'
export const COURSE_LIST = 'COURSE_LIST'
export const COURSE_DOUBLE_ASYNC = 'COURSE_DOUBLE_ASYNC'
export const COURSE_USE_CARDS = 'COURSE_DOUBLE_ASYNC'
export const CARD_BUY_COURSE = 'CARD_BUY_COURSE'//用卡买课程
export const COURSE_NOTIFY_CLOSE = 'COURSE_NOTIFY_CLOSE'
export const ORDER_BUTTON_LOAD = 'ORDER_BUTTON_LOAD'
export const ADS = 'ADS'

//广告
export function adAction() {
    return (dispatch, getState) => {
        httpGet("index.php?g=Restful&m=Course&a=adList",
            {cid: 4},
            ADS,
            dispatch);
    }
}
export function useCardsClick(courseId, k) {
    return (dispatch, getState) => {
        httpGet("index.php?g=Restful&m=Course&a=useCards",
            {userId: window.userid, courseId: courseId},
            COURSE_USE_CARDS,
            dispatch);
    }
}
export function cardBuyCourseClick(courseId, cardId) {
    return (dispatch, getState) => {
        httpGet("index.php?g=Restful&m=Course&a=cardBuyCourse",
            {userId: window.userid, courseId: courseId, cardId: cardId},
            CARD_BUY_COURSE,
            dispatch);
    }
}

export function coursesAction(day = new Date().getDay()) {
    return (dispatch, getState) => {
        httpGet("index.php?g=Restful&m=Course&a=clist",
            {day: day, userId: window.userid},
            COURSE_LIST,
            dispatch);
    }
}

const ACTION_HANDLERS = {
    [COURSE_LIST]: (state, action) => {
        return {courses: action.res.data, useCards: state.useCards, orderStatus: 0, buttonLoads: state.buttonLoads,ads:state.ads}
    },
    [COURSE_ORDER]: (state, action) => {
        var courses = [];
        if (action.res.status) {
            for (var i = 0; i < state.courses.length; i++) {
                if (state.courses[i].id == action.res.courseId) {
                    state.courses[i].isOrder = true;
                    state.courses[i].ccpeople = parseInt(state.courses[i].ccpeople) + 1;
                    state.courses[i].headimgs.push(action.res.headimg);
                }
                courses.push(state.courses[i]);
            }
            return {courses: courses, useCards: state.useCards, orderStatus: 0, buttonLoads: state.buttonLoads,ads:state.ads}
        } else {
            return state;
        }
    },
    [COURSE_USE_CARDS]: (state, action) => {
        return {courses: state.courses, useCards: action.res.data, orderStatus: 0, buttonLoads: state.buttonLoads,ads:state.ads}
    },
    [CARD_BUY_COURSE]: (state, action) => {
        setTimeout(function () {
            action.dispatch({
                type: COURSE_NOTIFY_CLOSE
            });
        }, 3000);

        if (action.res.status) {
            return {courses: action.res.data, useCards: state.useCards, orderStatus: 1, buttonLoads: state.buttonLoads,ads:state.ads}
        } else {
            return {courses: state.courses, useCards: state.useCards, orderStatus: 2, buttonLoads: state.buttonLoads,ads:state.ads}
        }
    },
    [COURSE_NOTIFY_CLOSE]: (state, action) => {
        return {courses: state.courses, useCards: state.useCards, orderStatus: 0, buttonLoads: state.buttonLoads,ads:state.ads}
    },
    [ORDER_BUTTON_LOAD]: (state, action) => {
        let buttonLoads = [];
        for (var i = 0; i < state.courses.length; i++) {
            if (action.k == i && action.ctype == 0) {
                buttonLoads.push(true);
            } else {
                buttonLoads.push(false);
            }
        }
        return {courses: state.courses, useCards: state.useCards, orderStatus: 0, buttonLoads: buttonLoads,ads:state.ads}
    },
    [ADS]: (state, action) => {
        return {courses: state.courses, useCards: state.useCards, orderStatus: 0, buttonLoads: state.buttonLoads,ads:action.res.data}
    }
}
//默认值
const initialState = {courses: [], useCards: [], orderStatus: 0, buttonLoads: [],ads:[]}
export default function courseReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}
