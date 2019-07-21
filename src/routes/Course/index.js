import {injectReducer} from '../../store/reducers'

export default (store) => ({
    path: 'course',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Course = require('./containers/CourseContainer').default
            const reducer = require('./modules/course').default

            injectReducer(store, {key: 'course', reducer})

            cb(null, Course)

        }, 'course')
    }
})
