import { connect } from 'react-redux'
import {getCardClick,initCard} from '../modules/buy'
import Buy from '../components/Buy'


const mapDispatchToProps = {
    getCardClick:getCardClick,
    initCard:initCard
}

const mapStateToProps = (state) => ({
    
})
const c =connect(mapStateToProps, mapDispatchToProps)(Buy);

export default c
