import React from 'react'
import { IndexLink, Link } from 'react-router'
import {
    Button,
} from 'amazeui-touch'
const sy={
    padding:"2rem"
}
export const HomeView = () => (
    <div style={sy}>
        <Link to="/vip"><Button amStyle="success">会员卡</Button></Link>
        <Link to="/course"><Button amStyle="dark">预约课程</Button></Link>
        <br/>
        <br/>
        <hr/>
        <br/>
        <Link to="/buy"><Button amStyle="warning">购买消费卡</Button></Link>
        <Link to="/trainer"><Button amStyle="secondary">教练入口</Button></Link>

    </div>
)

export default HomeView
