import {connect} from 'react-redux'
import {cardBuyCourseClick, coursesAction, useCardsClick,adAction} from '../modules/course'

import Course from '../components/Course'

const mapDispatchToProps = {
    buyClick: cardBuyCourseClick,
    weekClick: coursesAction,
    useCardsClick: useCardsClick,
    adAction: adAction

}

const mapStateToProps = (state) => {
    return {
        courses: state.course.courses,
        useCards: state.course.useCards,
        orderStatus:state.course.orderStatus,
        buttonLoads:state.course.buttonLoads,
        ads:state.course.ads
    }
}
const c = connect(mapStateToProps, mapDispatchToProps)(Course);

export default c
