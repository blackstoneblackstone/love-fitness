import superAgent from 'superagent'

export function httpGet(url, query, actionType, dispatch) {

    console.log(`HTTPGET::${window.SERVER_URL + url}`);
    superAgent["get"](window.SERVER_URL + url)
        .send()
        .query(query)
        .end((err, res)=> {
            if (err) {
            } else {
                dispatch({
                    type: actionType,
                    res: res.body,
                    dispatch: dispatch
                })
            }
        })
}

export function BaseGet(url, query, success) {

    console.log(`HTTPGET::${window.SERVER_URL + url}`);
    superAgent["get"](window.SERVER_URL + url)
        .send()
        .query(query)
        .end((err, res)=> {
            if (err) {
            } else {
                success(res);
            }
        })
}

export function httpPost(params) {
    return ()=> {
        let deferred = Promise.defer()
        superAgent["post"](params.url)
            .send(params.body)
            .query(params.query)
            .end((err, res)=> {
                if (err) {
                    params.error(err);
                    deferred.reject()
                } else {
                    params.success(res.body)
                    deferred.resolve(res.body);
                }
            })
        return deferred.promise
    }
}


