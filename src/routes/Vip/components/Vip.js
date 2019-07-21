import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'
import { getDate } from '../../../utils'
import {
  Container,
  Tabs,
  Grid,
  Accordion,
  Badge,
  List,
  Col,
  Modal,
  Group,
  Notification,
  ButtonGroup,
  Card,
  Icon,
  Button,
  OffCanvasTrigger,
  OffCanvas
} from 'amazeui-touch'
import JSTelLogin from '../../../components/JSTelLogin'
import JSCard from '../../../components/JSCard'
import JSUserInfo from '../../../components/JSUserInfo'
import Helmet from 'react-helmet'
import JSCourseList from '../../../components/JSCourseList'
export default class Vip extends Component {
  
    state = {
    isOpen: false,
    cardIsOpen: false,
    activeTab: 0
  }
  telClick = () => {
    this.setState({
      isOpen: true
    })
  }
  close = () => {
    this.setState({
      isOpen: false
    })
  }
  cardClose = () => {
    this.setState({
      cardIsOpen: false,
    })
  }
  bindingClick = (tel, truename) => {
    this.setState({
      isOpen: false
    })
    this.props.bindingClick(tel, truename)
  }
  tabClick = (k) => {

    if (k == 0) {
      this.props.myJsClick()
    }
    if (k == 1) {
      this.props.buyCardClick()
    }
    this.setState({
      activeTab: k,
    })
  }
  closeNotification = () => {
    this.setState({
      visible: false
    })
  }
  cardClick = (k) => {
    if (k == 0) {
      this.props.myCardClick()
    }
  }

  orderClick = (courseId, k) => {
    this.setState({
      cardIsOpen: true,
      courseId: courseId
    })
    this.props.useCardsClick(courseId, k)
  }
  goToTab2 = () => {
    this.cardClose()
    this.tabClick(1)
  }
  cardBuyCourseClick = (courseId, cardId) => {
    this.setState({
      cardIsOpen: false
    })
    this.props.cardBuyCourseClick(courseId, cardId)
  }

  componentWillMount () {
    this.props.myJsClick()
    this.props.myCardClick()
    this.props.weekClick(getDate(0))
    this.props.courseTypeClick()
    this.props.initTeacher()
  }

  render () {
    const vip = this
    return (
      <Container className="vip" fill>
        <Notification
          title="提示"
          amStyle="warning"
          visible={this.props.buyState == 0 ? false : true}
          onClick={this.props.closeNotification}
          animated
          style={{textAlign: 'center'}}
        >
          {this.props.msg}
        </Notification>
        <Helmet
          title="尊贵会员"
        />
        <div>
          <JSUserInfo userInfo={this.props.userInfo} telClick={this.telClick}></JSUserInfo>
          <div>
            <Accordion onAction={this.cardClick}>
              <Accordion.Item
                title={<span>
                                    <img src="img/icon1.png" style={{
                                      height: '25px',
                                      marginRight: '5px',
                                      marginTop: '-5px'
                                    }}/>
                                    我的消费卡{this.props.buyState == 2 ? <Badge style={{marginLeft: '2rem'}} rounded
                                                                            amStyle="alert">有新的消费卡</Badge> : ''}</span>}>
                <Group noPadded>
                  <List>
                    {this.props.mycards.map(function (w, k) {

                      return (
                        <List.Item
                          key={k}
                          after={w.usetimes == -1 ? '' :
                            <div style={{position: 'relative'}}>剩余: <span className="new-price">{w.usetimes}</span>
                              次 {w.day == '过期了' ? <i className="iconfont icon-guoqi1" style={{
                                color: 'red',
                                position: 'absolute',
                                fontSize: '4rem',
                                top: '10px',
                                left: '0'
                              }}></i> : ''}</div>}
                          title={<strong> {w.name}</strong>}
                          subTitle={<span>适用于：<label>【{w.type}】</label></span>}
                          desc={<span>有效期到：{w.day}</span>}
                        />
                      )
                    })}
                  </List>
                </Group>
              </Accordion.Item>
            </Accordion>

            <div className="vip-item">
              <div style={{padding: '10px 0 10px 10px'}}>
                <img src="img/person.png" style={{
                  height: '25px',
                  marginRight: '5px',
                  marginTop: '-5px'
                }}/>
                我的私人教练
              </div>
              <ul className="teacher-con">
                {this.props.teachers.map(function (w, k) {
                  return (
                    <Link to={"/personalview/"+w.id}>
                      <li className="animated fadeInLeft">
                        <div className="tc-img" style={{
                          backgroundImage: 'url(' + window.SERVER_URL + w.headimg + ')'
                        }}></div>
                        <div>{w.tname}</div>
                      </li>
                    </Link>)
                })}
              </ul>
            </div>

            <div className="course-type-con">
              <div style={{paddingLeft: 10, paddingBottom: 10}}>
                <img src="img/icon2.png"
                     style={{height: '25px', marginRight: '5px', marginTop: '-5px'}}/>
                课程体系介绍
              </div>
              <Grid
                wrap="wrap"
              >
                {this.props.courseTypes.map(function (w, k) {

                  return (
                    <OffCanvasTrigger
                      key={w.id}
                      animation="push"
                      pageContainer="#mainCon"
                      placement="right"
                      offCanvas={
                        <OffCanvas>
                          <div className="course-desc">
                            <div dangerouslySetInnerHTML={{__html: w.tdesc}}>
                            </div>
                          </div>
                        </OffCanvas>}
                    >
                      <Col cols={vip.props.courseTypes.length == 2 ? 3 : 2} key={w.id}>
                        <div className="js-course-item">
                          <img src={window.SERVER_URL + w.icon} style={{height: '50px'}}/>
                          <div style={{fontSize: '0.8rem'}}>{w.tname}</div>
                        </div>
                      </Col>
                    </OffCanvasTrigger>
                  )
                })}
              </Grid>

            </div>
          </div>
          <div className="js-vip-tabs">
            <Tabs onAction={this.tabClick} activeKey={this.state.activeTab}>
              <Tabs.Item
                title={<div className="js-vip-tab"><i className="iconfont icon-jilu"></i><br/>健身记录</div>}
                navStyle="gm"
              >
                <Container>
                  <ul>
                    {this.props.jsTimeLine.map(function (w, k) {
                      return (
                        <li className="course-li animated fadeInLeft"
                            key={w.id}>
                          <div className="course-li-tail"></div>
                          <div className="course-li-icon">
                            <img src={window.SERVER_URL + w.icon}/>
                          </div>
                          <label style={{marginLeft: '10px'}}>{w.cday}</label>
                          {w.state != 2 ? <Card
                            header={<div style={{width: '100%'}}>
                                                                <span><i className="iconfont icon-run"
                                                                         style={{color: '#38d4d6'}}></i>{w.cname}</span>
                              {w.state == 0 ? <span style={{float: 'right'}}><label>未开始</label><Button
                                onClick={vip.props.cancelOrderClick.bind(this, w.id)}
                                amStyle="alert"
                                style={{marginLeft: '1rem'}}>取消预约</Button></span> : w.state == 1 ?
                                <span style={{float: 'right'}}><label>进行中</label></span> : w.state == 2 ?
                                  <span>结束了</span> : ''}</div>}>
                            <div><strong>时间: </strong>{w.cstime}-{w.cetime}</div>
                            <div><strong>教练: </strong>{w.teacher}</div>
                          </Card>
                            : <div className="js-stop-con">{w.cname}
                              <span className="js-stop-right">结束了</span></div>}
                        </li>)
                    })
                    }
                  </ul>
                </Container>
              </Tabs.Item>
              <Tabs.Item
                noPadded
                title={<div className="js-vip-tab"><i className="iconfont icon-ciqiaxiaofei"></i><br/>购买消费卡</div>}
                navStyle="gm"
              >
                <JSCard buyClick={this.props.buyClick} cards={this.props.cards}> </JSCard>
              </Tabs.Item>
              <Tabs.Item
                noPadded
                title={<div className="js-vip-tab"><i className="iconfont icon-yuyue"></i><br/>预约课程</div>}
                navStyle="gm"
              >
                <div className="js-course-con">
                  <br/>
                  <JSCourseList buttonLoads={this.props.buttonLoads} courses={this.props.courses}
                                orderClick={this.orderClick}
                                weekClick={this.props.weekClick}></JSCourseList>
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        </div>
        <Modal
          ref="modal"
          isOpen={this.state.cardIsOpen}
          onDismiss={this.cardClose}
          role="actions"
        >
          <Card header="使用消费卡购买课程"
                footer={this.props.useCards.length == 0 ? <ButtonGroup amStyle="primary" justify>
                  <Button onClick={this.goToTab2} amStyle="success">去购买消费卡</Button>
                </ButtonGroup> : ''}
          >
            {this.props.useCards.length != 0 ? <List style={{border: 'solid 1px #f2f2f2'}}>
              {this.props.useCards.map(function (w, k) {
                return (
                  <List.Item
                    key={k}
                    onClick={vip.cardBuyCourseClick.bind(this, vip.state.courseId, w.id)}
                    after={<span><Badge amStyle="secondary">{w.day}前有效</Badge>
                                        <Badge amStyle="warning">{w.usetimes == -1 ? '不限次' : w.usetimes + '次'}</Badge>
                                        </span>}
                    title={w.name}/>
                )
              })}
            </List> : '没有可用的消费卡'
            }
          </Card>
        </Modal>
        <JSTelLogin show={this.state.isOpen} close={this.close} bindingClick={this.bindingClick}></JSTelLogin>

      </ Container >
    )
  }
}

Vip.propTypes = {
  msg: PropTypes.string.isRequired,
  teachers: PropTypes.array.isRequired,
  jsEchart: PropTypes.object.isRequired,
  buttonLoads: PropTypes.array.isRequired,
  userInfo: PropTypes.object.isRequired,
  jsTimeLine: PropTypes.array.isRequired,
  mycards: PropTypes.array.isRequired,
  courseTypes: PropTypes.array.isRequired,
  courseTypeClick: PropTypes.func.isRequired,
  cards: PropTypes.object.isRequired,
  bindingClick: PropTypes.func.isRequired,
  myJsClick: PropTypes.func.isRequired,
  cancelOrderClick: PropTypes.func.isRequired,
  buyCardClick: PropTypes.func.isRequired,
  buyClick: PropTypes.func.isRequired,
  cardBuyCourseClick: PropTypes.func.isRequired,
  myCardClick: PropTypes.func.isRequired,
  buyState: PropTypes.number.isRequired,
  closeNotification: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  orderClick: PropTypes.func.isRequired,
  weekClick: PropTypes.func.isRequired,
  useCardsClick: PropTypes.func.isRequired,
  jsEchartClick: PropTypes.func.isRequired,
  initTeacher: PropTypes.func.isRequired,

}


