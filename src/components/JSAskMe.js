import  React, {Component, PropTypes} from 'react'
import {Tabs, Button, GroundButton,Group} from 'amazeui-touch'

class JSAskMe extends Component {

    componentWillMount() {
    }

    render() {
        let jsam = this;
        return (
            <div className="js-ask-me">
                <div className="js-ask-me-time">
                    <Group
                        header="早上"
                    >
                        <Button amStyle="success" amSize="lg">09:00</Button>
                        <Button amStyle="success" amSize="lg">10:00</Button>
                        <Button amStyle="success" amSize="lg">11:00</Button>
                        <Button amStyle="success" amSize="lg">12:00</Button>
                    </Group>
                    <Group
                        header="下午"
                    >
                        <Button amStyle="success" amSize="lg">13:00</Button>
                        <Button amStyle="success" amSize="lg">14:00</Button>
                        <Button amStyle="success" amSize="lg">15:00</Button>
                        <Button amStyle="success" amSize="lg">16:00</Button>
                        <Button amStyle="success" amSize="lg">17:00</Button>
                    </Group>
                    <Group
                        header="晚上"
                    >
                        <Button amStyle="success" amSize="lg">18:00</Button>
                        <Button amStyle="success" amSize="lg">19:00</Button>
                        <Button amStyle="success" amSize="lg">20:00</Button>
                        <Button amStyle="success" amSize="lg">21:00</Button>
                    </Group>
                </div>
                <div className="js-ask-me-day">
                    <Button amStyle="secondary" amSize="xl">后天</Button>
                    <Button amStyle="warning" amSize="xl">明天</Button>
                    <Button amStyle="success" amSize="xl">今天</Button>
                </div>
            </div>
        )
    }
}

JSAskMe.propTypes = {}

export default JSAskMe

