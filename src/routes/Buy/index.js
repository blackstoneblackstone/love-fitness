import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path: 'buy',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Buy = require('./containers/BuyContainer').default
            const reducer = require('./modules/buy').default

            injectReducer(store, {key: 'buy', reducer})

            cb(null, Buy)

        }, 'buy')
    }
})
