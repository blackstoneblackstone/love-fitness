import React, {Component, PropTypes} from 'react'
import {
    Tabs,Card
} from 'amazeui-touch'

const header = (
    <Card.Child>
        <img src="/img/qrcode.jpg"/>
    </Card.Child>
);
export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                <Card center>
                    <label>
                        程序员小哥可没偷懒，功能正在完善...
                    </label>
                </Card>
                <Card header={header} style={{textAlign:"center"}}>
                    <h3>Fitness</h3>
                    <label>北京首家360度全维私人健体管理中心</label>
                </Card>
            </div>
        )
    }
}

PageNotFound.propTypes = {}

