import React,{Component, PropTypes} from 'react'
import {
    ButtonGroup, Button,
} from 'amazeui-touch'

export default class Buy extends Component {

    componentDidMount() {
        this.props.initCard();
    }

    render() {
        return (
            <div className="js-card-con">
                <img src="img/try.jpg"/>
                <br/>
                <br/>
                <br/>
                <br/>
                <ButtonGroup amStyle="primary" justify>
                    <Button onClick={this.props.getCardClick} amStyle="success">点击领取免费体验卡</Button>
                </ButtonGroup>
            </div>)
    }
}
Buy.propTypes = {
    getCardClick: PropTypes.func.isRequired,
    initCard: PropTypes.func.isRequired
}

