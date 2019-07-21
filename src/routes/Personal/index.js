import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path: 'personal',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Personal = require('./Container').default
            const reducer = require('./Modules').default
            injectReducer(store, {key: 'personal', reducer})
            cb(null, Personal)
        }, 'personal')
    }
})
