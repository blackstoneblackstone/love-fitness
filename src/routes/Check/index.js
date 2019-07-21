import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path: 'check',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Check = require('./Container').default
            const reducer = require('./Modules').default
            injectReducer(store, {key: 'check', reducer})
            cb(null, Check)
        }, 'check')
    }
})
