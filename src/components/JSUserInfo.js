import  React,{Component, PropTypes} from 'react'
import {
    Container,
    Grid,
    List,
    Col,
    Button,
} from 'amazeui-touch'
class JSUserInfo extends Component {

    render() {
        if (this.props.userInfo.tel) {
            return (
                <div className="js-user-info">
                    <Grid >
                        <Col cols={2}>
                            <img className="avactor" src={this.props.userInfo.head_img}/></Col>
                        <Col cols={4}>
                            <h2 style={{marginBottom:"0.2rem"}}>{this.props.userInfo.name}</h2>
                            <div>手机号码: {this.props.userInfo.tel.substring(0,3)+"****"+this.props.userInfo.tel.substring(7,11)}</div>
                            <div>注册时期: {this.props.userInfo.create_time}</div>
                            <div>签到次数: <strong>{this.props.userInfo.login_times}</strong></div>
                        </Col>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div className="js-user-info">
                    <Grid >
                        <Col cols={2}>
                            <img className="avator" src={this.props.userInfo.head_img}/></Col>
                        <Col cols={4}>
                            <h1>{this.props.userInfo.name}</h1>
                            <Button onTouchEnd={this.props.telClick} style={{marginTop:"1rem"}}
                                    amStyle="success">绑定手机号</Button>
                        </Col>
                    </Grid>
                </div>
            )
        }
    }
}

JSUserInfo.propTypes = {
    userInfo: PropTypes.object.isRequired,
    telClick: PropTypes.func.isRequired
}
export default JSUserInfo
