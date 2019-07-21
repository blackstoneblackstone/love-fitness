import { connect } from 'react-redux'
import {
  buyCardClick,
  myJsClick,
  bindingClick,
  buyClick,
  closeNotification,
  myCardClick,
  orderAction,
  coursesAction,
  useCardsClick,
  cardBuyCourseClick,
  cancelOrderClick,
  courseTypeClick,
  jsEchartClick,
  initTeacher
} from '../modules/vip'

import Vip from '../components/Vip'

const mapDispatchToProps = {
  cancelOrderClick: cancelOrderClick,
  bindingClick: bindingClick,
  myJsClick: myJsClick,
  buyCardClick: buyCardClick,
  buyClick: buyClick,
  closeNotification: closeNotification,
  myCardClick: myCardClick,
  orderClick: orderAction,
  weekClick: coursesAction,
  useCardsClick: useCardsClick,
  cardBuyCourseClick: cardBuyCourseClick,
  courseTypeClick: courseTypeClick,
  jsEchartClick: jsEchartClick,
  initTeacher: initTeacher
}

const mapStateToProps = (state) => {
  return {
    ...state.vip,
    userInfo:state.userInfo
  }
}
const c = connect(mapStateToProps, mapDispatchToProps)(Vip)

export default c
