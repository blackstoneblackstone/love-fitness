import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path: 'personalview/:id',
  getComponent (nextState, cb) {
    let id = nextState.params.id
    require.ensure([], (require) => {
      const PersonalView = require('./Container').default;
      const reducer = require('./Modules').default;
      //初始化
      const modulesFunction = require('./Modules').modulesFunction;
      modulesFunction.initTrainer(id)(store.dispatch,store.getState());
      injectReducer(store, {key: 'personalview', reducer})
      cb(null, PersonalView)
    }, 'personalview')
  }
})
