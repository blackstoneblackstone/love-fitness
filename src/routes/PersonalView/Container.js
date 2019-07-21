import { connect } from 'react-redux'
import {modulesFunction} from './Modules'
import PersonalView from './PersonalView'


const mapStateToProps = (state) => ({
    ...state.personalview
})
const c =connect(mapStateToProps, modulesFunction)(PersonalView);

export default c;
