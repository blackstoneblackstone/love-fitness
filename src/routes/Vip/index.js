import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path: 'vip',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Vip = require('./containers/VipContainer').default
            const reducer = require('./modules/vip').default
            injectReducer(store, {key: 'vip', reducer})
            cb(null, Vip)
        }, 'vip')
    }
})
