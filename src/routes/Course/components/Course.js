import React,{Component,PropTypes} from 'react'
import JSCourseList from '../../../components/JSCourseList'
import {getDate} from '../../../utils'
import {Link} from 'react-router'
import {
    Slider, Modal, List, Notification, Badge, Card, ButtonGroup, Button,
} from 'amazeui-touch'

export default class Course extends Component {
    state = {
        isOpen: false,
        cardIsOpen: false
    }

    open = () => {
        this.setState({
            isOpen: true,
        })
    }

    close = () => {
        this.setState({
            isOpen: false,
        });
    }
    cardClose = () => {
        this.setState({
            cardIsOpen: false,
        });
    }
    orderClick = (courseId, k) => {
        this.setState({
            cardIsOpen: true,
            courseId: courseId
        });
        this.props.useCardsClick(courseId, k);
    }
    buyClick = (courseId, cardId)=> {
        this.setState({
            cardIsOpen: false
        });
        this.props.buyClick(courseId, cardId);
    }

    componentWillMount() {
        this.props.adAction();
        this.props.weekClick(getDate(0));
    }

    render() {
        const course = this;
        return (
            <div>
                <Notification
                    title="提示"
                    amStyle="warning"
                    visible={this.props.orderStatus==0?false:true}
                    animated
                    style={{textAlign:"center"}}
                >
                    {this.props.orderStatus == 1 ? '预约成功' : this.props.orderStatus == 2 ? '预约失败' : ""}
                </Notification>
                <Slider controls={false}>
                    {this.props.ads.map(function (w, k) {
                        return (
                            <Slider.Item key={w.id}>
                                <a href={w.url}> <img src={w.img}/></a>
                            </Slider.Item>)
                    })}
                </Slider>
                <div className="js-course-con">
                    <h3>预约课程</h3>
                    <br/>
                    <JSCourseList buttonLoads={this.props.buttonLoads} courses={this.props.courses}
                                  orderClick={this.orderClick}
                                  weekClick={this.props.weekClick}></JSCourseList>
                </div>

                <Modal
                    ref="modal"
                    isOpen={this.state.cardIsOpen}
                    onDismiss={this.cardClose}
                    role="actions"
                >
                    <Card
                        header="使用消费卡购买课程"
                        footer={this.props.useCards.length==0?<Link style={{width:'100%'}} to="/vip"><ButtonGroup amStyle="primary" justify>
                             <Button amStyle="success">去会员中心购买消费卡</Button>
                            </ButtonGroup></Link>:""}
                    >
                        {this.props.useCards.length != 0 ? <List style={{border: "solid 1px #f2f2f2"}}>
                            {this.props.useCards.map(function (w) {
                                return (
                                    <List.Item onClick={course.buyClick.bind(this,course.state.courseId,w.id)}
                                               after={<span><Badge amStyle="secondary">{w.day}前有效</Badge><Badge amStyle="warning">{w.usetimes==-1?"不限次":w.usetimes+"次"}</Badge>
                                        </span>}
                                               title={w.name}/>
                                )
                            })}
                        </List> : "没有可用的消费卡"
                        }
                    </Card>
                </Modal>
            </div>
        )
    }
}

Course.propTypes = {
    ads: PropTypes.array.isRequired,
    courses: PropTypes.array.isRequired,
    buttonLoads: PropTypes.array.isRequired,
    useCards: PropTypes.array.isRequired,
    buyClick: PropTypes.func.isRequired,
    weekClick: PropTypes.func.isRequired,
    useCardsClick: PropTypes.func.isRequired,
    adAction: PropTypes.func.isRequired,
    orderStatus: PropTypes.number.isRequired,
}
