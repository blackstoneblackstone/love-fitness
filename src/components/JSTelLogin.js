import React, {Component, PropTypes} from 'react'
import {
    List,
    Modal,
    Button,
    ButtonGroup,
    Icon,
    Field,
} from 'amazeui-touch'

class JSTelLogin extends Component {
    state = {
        invalid: false
    }
    bindingClick = ()=> {
        let tel = this.refs.tel.getValue()
        let truename = this.refs.truename.getValue()

        if (tel && truename) {
            console.log(truename)
            this.props.bindingClick(tel, truename);
        } else {
            this.setState({
                invalid: true
            })
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.show}
                title="绑定手机号"
                onDismiss={this.props.close}
            >
                <List
                    className="margin-v-sm"
                >
                    <List.Item
                        media={<Icon name="mobile" />}
                        nested="input"
                    >

                        <Field
                            ref="truename"
                            type="text"
                            placeholder='真实姓名'
                        />
                    </List.Item>

                    <List.Item
                        media={<Icon name="user" />}
                        nested="input"
                    >
                        <Field
                            ref="tel"
                            type="tel"
                            placeholder='手机号'
                        />
                    </List.Item>
                </List>
                {this.state.invalid ? <p style={{color: 'red'}}>请填写手机号和真实姓名</p> : null}
                <ButtonGroup justify>
                    <Button
                        onClick={this.props.close}
                    >
                        不绑了
                    </Button>
                    <Button
                        onClick={this.bindingClick}
                        amStyle="secondary"
                    >
                        绑定
                    </Button>
                </ButtonGroup>
            </Modal>
        )
    }
}

JSTelLogin.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    bindingClick: PropTypes.func.isRequired
}
export default JSTelLogin
