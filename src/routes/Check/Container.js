import { connect } from 'react-redux'
import {modulesFunction} from './Modules'
import Check from './Check'


const mapStateToProps = (state) => ({
    userInfo:state.userInfo,
    userid:window.userid,
    ...state
})
const c =connect(mapStateToProps, modulesFunction)(Check);

export default c;
