import { connect } from 'react-redux'
import {modulesFunction} from './Modules'
import Personal from './Personal'


const mapStateToProps = (state) => ({
    ...state.personal
})
const c =connect(mapStateToProps, modulesFunction)(Personal);

export default c;
