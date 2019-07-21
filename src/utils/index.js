import superAgent from 'superagent'

export const getDate = (AddDayCount) => {
    let dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    let y = dd.getFullYear();
    let m = dd.getMonth() + 1;//获取当前月份的日期
    let d = dd.getDate();
    return y + "-" + m + "-" + d;
}
export const setCookie = (c_name, value, expiredays = 24 * 7 * 60 * 60)=> {
    var exdate = new Date();
    exdate.setTime(Number(exdate) + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

export const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");//获取字符串的起点
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;//获取值的起点
            var c_end = document.cookie.indexOf(";", c_start);//获取结尾处
            if (c_end == -1) c_end = document.cookie.length;//如果是最后一个，结尾就是cookie字符串的结尾
            return decodeURI(document.cookie.substring(c_start, c_end));//截取字符串返回
        }
    }
    return "";
}

export const getQueryString = (name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)return unescape(r[2]);
    return null;
}
export const userInfo = (u)=> {
    let url = `index.php?g=Restful&m=Oauth&a=userInfo&u=${u}`;
    superAgent["get"](url)
        .end((err, res)=> {
            if (err) {
                window.USERINFO = {};
            } else {
                window.USERINFO = res.body.data;
            }
        })
}

export const deepCopy = (source) => {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] ==='object'? deepCopy(source[key]) : source[key];
    }
    return result;
}