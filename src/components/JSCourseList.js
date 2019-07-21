import  React, {Component, PropTypes} from 'react'
import {Icon, List, Rate, Button, Badge, Card} from 'amazeui-touch'
import {getDate} from '../utils'

class JSCourseList extends Component {
    state = {
        cweek: "周一MON",
        week: ['周日SUM', '周一MON', '周二TUE', '周三WED', '周四THU', '周五FRI', '周六SAT', '周日SUM'],
        cw: 0,
        cd: "",
        today: 0
    }

    weekAction = (key, event) => {
        let da = getDate(key);
        this.setState({cweek: event.target.innerHTML, cw: key, cd: da});
        this.props.weekClick(da);
    }
    orderAction = (id, k, event) => {
        this.props.orderClick(id, k);
    }

    componentWillMount() {
        let dd = new Date();
        var d = dd.getDay();
        this.setState({cweek: this.state.week[d], cd: getDate(0), today: d});
        var weeks = []
        for (var i = 0; i < 8; i++) {
            weeks.push(this.state.week[d]);
            if (d == 7) {
                d = 0;
            }
            d++;
        }
        this.setState({weeks: weeks});
    }

    render() {
        let jsc = this;
        return (
            <div>
                <div className="cl-label">
                    <ul>
                        { this.state.weeks.map(function (w, k) {
                            if (jsc.state.cw == k && k == 0) {
                                return (<li key={k} onClick={jsc.weekAction.bind(this, k)}
                                            className="jsc-label-active">今天</li>);
                            }
                            if (k == 0) {
                                return (<li key={k} onClick={jsc.weekAction.bind(this, k)}>今天</li>);
                            }
                            if (jsc.state.cw == k) {
                                return (<li key={k} onClick={jsc.weekAction.bind(this, k)}
                                            className="jsc-label-active">{w}</li>);
                            } else {
                                return (<li key={k} onClick={jsc.weekAction.bind(this, k)}>{w}</li>);
                            }
                        })}
                    </ul>
                </div>
                <hr/>
                <br/>
                <div><h2>{this.state.cweek}</h2>{this.state.cd}</div>
                <hr/>
                <ul className="course-ul">

                    {
                        this.props.courses.length == 0 ? (
                            <li color="red"><i className="iconfont icon-"></i>虽然今天没有课,但小伙伴们也可以来玩奥!</li>) : this.props.courses.map(function (w, k) {
                            return (
                                <li className="course-li"
                                    key={w.id}
                                    color="green">
                                    <div className="course-li-tail"></div>
                                    <div className="course-li-icon">
                                        <img src={window.SERVER_URL + w.icon}/>
                                    </div>
                                    <label style={{marginLeft: "10px"}}>{w.cstime}-{w.cetime} <span style={{color:w.tag}}>【{w.ctype}】</span></label>
                                    <Card header={<div style={{width: "100%"}}><span>
                                        <i className="iconfont icon-jianshen1"
                                           style={{color: "#38d4d6",marginRight:"10px"}}></i>{w.cname}</span>
                                        {w.isOrder == 0 ?
                                            <Button style={{float: "right"}} amStyle="success" amSize="xs"
                                                    onClick={jsc.orderAction.bind(this, w.id, k)}>预约</Button> : w.isOrder == 1 ?
                                                <label style={{float: "right"}}>已预约</label> : w.isOrder == 2 ? <label>爆满了</label> : ""}</div>}>

                                        <div><strong>教练: </strong>{w.teacher} </div>
                                        <div><strong>人数: </strong>{w.ccpeople}/{w.cpeople}</div>
                                        {w.headimgs.length != 0 ? <div><strong>已经预约的伙伴: </strong>
                                            {w.headimgs.map(function (w, k) {
                                                return (<img key={k} className="order-headimg" src={w}/>);
                                            })}
                                        </div> : <div></div>}
                                    </Card>
                                </li>
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}

JSCourseList.propTypes = {
    buttonLoads: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    orderClick: PropTypes.func.isRequired,
    weekClick: PropTypes.func.isRequired
}

export default JSCourseList
