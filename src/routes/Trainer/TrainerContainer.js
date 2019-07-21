import { connect } from 'react-redux'
import {modulesFunction} from './Module'
import Trainer from './Trainer'

const mapDispatchToProps = {
  ...modulesFunction
}

const mapStateToProps = (state) => ({
  ...state.trainer
})
const c =connect(mapStateToProps, mapDispatchToProps)(Trainer);

export default c
