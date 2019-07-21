import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import {
  ButtonGroup, Button, Card, Icon, Tabs, Modal, List, Badge, Notification
} from 'amazeui-touch'
import Helmet from 'react-helmet'
import { getDate } from '../../utils'

const userImgStyle = {
  height: '2.2rem',
  borderRadius: '50%',
  border: 'solid #0e90d2 1px'
}

export default class PersonalView extends Component {

  state = {
    today: getDate(0),
    tomorrow: getDate(1),
    houtian: getDate(2),
    cardIsOpen: false,
    timeId: 0,
    currentDay: getDate(0)
  }
  header = (headimg) => {
    return (
      <Card.Child cover={window.SERVER_URL + headimg}>
        <h1 style={{webkitTextStroke: '1px #fff', fontSize: '3rem'}}>
          {this.props.trainer.tname}
          <br/>
          <span style={{
            marginLeft: '20px',
            color: '#4ba2ac',
            fontWeight: 500,
            fontSize: '1.5rem'
          }}>{this.props.trainer.sign}</span>
        </h1>
        <span className="star">
           <Icon name="star-filled"></Icon>
           <Icon name="star-filled"></Icon>
           <Icon name="star-filled"></Icon>
           <Icon name="star-filled"></Icon>
           <Icon name="star-filled"></Icon>
        </span>
      </Card.Child>
    )
  }
  tabClick = (k) => {
    switch (k) {
      case 0:
        this.setState({
          currentDay: this.state.today
        })
        this.props.timeTabClick(this.props.trainer.id, this.state.today)
        break
      case 1:
        this.setState({
          currentDay: this.state.tomorrow
        })
        this.props.timeTabClick(this.props.trainer.id, this.state.tomorrow)
        break
      case 2:
        this.setState({
          currentDay: this.state.houtian
        })
        this.props.timeTabClick(this.props.trainer.id, this.state.houtian)
        break
    }
  }
  cardClose = () => {
    this.setState({
      cardIsOpen: false
    })
  }
  orderAction = (timeId) => {
    this.setState({
      cardIsOpen: true,
      timeId: timeId
    })
    this.props.useCardAction()
  }
  orderTeacher = (cardId, teacherId, timeId, day) => {
    this.setState({
      cardIsOpen: false
    })
    this.props.orderTeacher(cardId, teacherId, timeId, day)
  }

  componentDidMount () {
  }

  render () {
    let personalView = this
    return (
      <div className="">
        <Notification
          title="提示"
          amStyle="warning"
          visible={this.props.notifyMsg == '0' ? false : true}
          animated
          style={{textAlign: 'center'}}
        >
          {this.props.notifyMsg}
        </Notification>
        <Helmet
          title="约私教"
        />
        {this.props.trainer.id ? <Card key={this.props.trainer.id}
                                       header={personalView.header(this.props.trainer.headimg)}>

          <div className="trainer-desc" dangerouslySetInnerHTML={{__html: this.props.trainer.tdesc}}>
          </div>
          <div style={{margin: '-1.25rem -0.9375rem'}}>
            <div className="pv-title">
              预约我的时间
            </div>
            <Tabs
              onAction={this.tabClick}
              activeKey={this.state.activeTab}
            >

              <Tabs.Item
                navStyle="gm"
                noPadded
                title={<span>今天<br/>{this.state.today}</span>}
              >
                <div className="pv-times">
                  {this.props.times.length == 0 ? <div className="pv-no-result">今天的课到此结束，回家休息啦！</div> : ''}
                  {
                    this.props.times.map(function (w, k) {
                      return (
                        <Button amStyle="success" disabled={w.state} amSize="xs" key={w.id}
                                onClick={personalView.orderAction.bind(this, w.id)}>
                          {w.state == 1 ? <span><img className="pv-use-img" src={w.userimg} style={userImgStyle}/>
                              <i className={'iconfont icon-yiyuyue'} style={{
                                position: 'absolute',
                                right: 0,
                                top: '-0.5rem',
                                color: 'red'
                              }}></i>
                            </span> : w.state == 2 ? <span style={{color: 'red', fontSize: '1rem'}}>有团课</span> :
                            <i className={'iconfont icon-' + k}></i>}
                          <br/>
                          {w.stime}-{w.etime}</Button>)
                    })
                  }
                </div>
              </Tabs.Item>
              <Tabs.Item
                noPadded
                navStyle="gm"

                title={<span>明天<br/>{this.state.tomorrow}</span>}
              >
                <div className="pv-times">
                  {
                    this.props.times.map(function (w, k) {
                      return (
                        <Button amStyle="success" disabled={w.state} amSize="xs" key={k}
                                onClick={personalView.orderAction.bind(this, w.id)}>
                          {w.state == 1 ? <span><img className="pv-use-img" src={w.userimg} style={userImgStyle}/>
                              <i className={'iconfont icon-yiyuyue'} style={{
                                position: 'absolute',
                                right: 0,
                                top: '-0.5rem',
                                color: 'red'
                              }}></i>
                            </span> : w.state == 2 ? <span style={{color: 'red', fontSize: '1rem'}}>有团课</span> :
                            <i className={'iconfont icon-' + k}></i>}
                          <br/>
                          {w.stime}-{w.etime}</Button>)
                    })
                  }
                </div>
              </Tabs.Item>
              <Tabs.Item
                noPadded
                title={<span>后天<br/>{this.state.houtian}</span>}
                navStyle="gm"
              >
                <div className="pv-times">
                  {
                    this.props.times.map(function (w, k) {
                      return (
                        <Button amStyle="success" disabled={w.state} amSize="xs" key={k}
                                onClick={personalView.orderAction.bind(this, w.id)}>
                          {w.state == 1 ? <span><img className="pv-use-img" src={w.userimg} style={userImgStyle}/>
                              <i className={'iconfont icon-yiyuyue'} style={{
                                position: 'absolute',
                                right: 0,
                                top: '-0.5rem',
                                color: 'red'
                              }}></i>
                            </span> : w.state == 2 ? <span style={{color: 'red', fontSize: '1rem'}}>有团课</span> :
                            <i className={'iconfont icon-' + k}></i>}
                          <br/>
                          {w.stime}-{w.etime}</Button>)
                    })
                  }
                </div>
              </Tabs.Item>
            </Tabs>
          </div>
        </Card> : <h3>非法ID</h3>}
        <Modal
          ref="modal"
          isOpen={this.state.cardIsOpen}
          onDismiss={this.cardClose}
          role="actions"
        >
          <Card header="选择下面的消费卡购买私教的时间"
                footer={this.props.useCards.length == 0 ? <Link to="/vip" style={{width: '100%'}}>
                  <ButtonGroup amStyle="primary" justify>
                    <Button amStyle="success">去购买消费卡</Button>
                  </ButtonGroup>
                </Link>
                  : ''}
          >
            {this.props.useCards.length != 0 ? <List style={{border: 'solid 1px #f2f2f2'}}>
              {this.props.useCards.map(function (w, k) {
                return (
                  <List.Item
                    key={k}
                    onClick={personalView.orderTeacher.bind(this, w.id, personalView.props.trainer.id, personalView.state.timeId, personalView.state.currentDay)}
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
      </div>)
  }
}
PersonalView.propTypes = {
  useCards: PropTypes.array.isRequired,
  notifyMsg: PropTypes.string.isRequired,
  trainer: PropTypes.object.isRequired,
  times: PropTypes.array.isRequired,
  timeTabClick: PropTypes.func.isRequired,
  orderTeacher: PropTypes.func.isRequired,
  useCardAction: PropTypes.func.isRequired
}

