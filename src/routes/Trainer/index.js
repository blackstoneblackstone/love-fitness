import {injectReducer} from '../../store/reducers'
export default (store) => ({
  path: 'trainer',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Container = require('./TrainerContainer').default
      const reducer = require('./Module').default
      injectReducer(store, {key: 'trainer', reducer})
      cb(null, Container)
    }, 'trainer')
  }
})
