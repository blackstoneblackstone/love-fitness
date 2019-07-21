import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import CourseRoute from './Course'
import VipRoute from './Vip'
import PersonalRoute from './Personal'
import TrainerRoute from './Trainer'
import PageNotFound from './PageNotFound'
import CheckRoute from './Check'
import PersonalViewRoute from './PersonalView'

import Redirect from './PageNotFound/redirect'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    VipRoute(store),
    CourseRoute(store),
    PersonalRoute(store),
    PageNotFound(store),
    TrainerRoute(store),
    CheckRoute(store),
    PersonalViewRoute(store),
    Redirect
  ]
})

export default createRoutes
