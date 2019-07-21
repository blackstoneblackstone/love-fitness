import {httpGet} from "../utils/http"

export const USER_INFO = 'USER_INFO'

export const userInfo = (store)=> {
    httpGet('index.php?g=Restful&m=Oauth&a=userInfo',
        {u: window.userid},
        USER_INFO, store.dispatch);
}
const handle=(res,state)=>{
    if(res.status){
        return res.data;
    }else{
        return state;
    }
}

const initialState = {cname: "未注册"}
export default function userInfoReducer(state = initialState, action) {
    return action.type === USER_INFO
        ? handle(action.res,state)
        : state
}
