import React, { PropTypes, Component } from 'react'

import {
  Group,
  Grid,
  Col,
  Tabs,
  List,
  Icon,
  Card,
  Button,
  Container,
  OffCanvasTrigger,
  OffCanvas,
  Loader,
} from 'amazeui-touch'
export default class Trainer extends Component {
  state = {
    activeTab: 0,
  }

  componentWillMount () {
    this.props.initTrainer()

  }

  tabClick = (k) => {

    if (k == 0) {
      this.props.tuankesClick()
    }
    if (k == 1) {
      this.props.sijiaosClick()
    }
    this.setState({
      activeTab: k,
    })
  }

  render () {
    if (this.props.pageState == 'show') {
      return (

        <div className="js-course-con" id="trainerCon">
          <img className="js-trainer" src={window.SERVER_URL + this.props.trainer.headimg}/>
          <div style={{textAlign: 'center'}}>{this.props.trainer.tname}</div>
          <br/>
          <Tabs onAction={this.tabClick} activeKey={this.state.activeTab}>
            <Tabs.Item
              title={
                <div className="js-vip-tab">
                  <i className="iconfont icon-jilu"></i>
                  <br/>我的团课课程</div>}
              navStyle="gm"
            >
              <List>
                {this.props.tuankes.map(function (w, k) {
                  return (
                    <OffCanvasTrigger
                      key={w.id}
                      animation="push"
                      pageContainer="#trainerCon"
                      placement="right"
                      offCanvas={
                        <OffCanvas>
                          <div>
                            <List>
                              {w.users.map(function (u, s) {
                                return (<List.Item
                                  key={s}
                                  media={<img width="70" src={u.headimg}/>} title={u.username}
                                  desc={<div>手机号：<span style={{color: 'red'}}>{u.tel}</span></div>}
                                  subTitle={<label>真实姓名：{u.truename}
                                  </label>}
                                >
                                </List.Item>)
                              })}
                            </List>
                          </div>
                        </OffCanvas>}
                    >
                      <List.Item title={w.cname}
                                 after={<div>{'全部学员（' + w.ccpeople + '人）'}<label> {w.state}</label></div>}
                                 subTitle={'【' + w.cftype + '】'}
                                 desc={
                                   <div>
                                     <div>{w.cday + ' ' + w.cstime + '-' + w.cetime}</div>
                                   </div>}
                      >
                      </List.Item>
                    </OffCanvasTrigger>)
                })}
              </List>
            </Tabs.Item>
            <Tabs.Item
              noPadded
              title={<div className="js-vip-tab"><i className="iconfont icon-1"></i><br/>我的私教学员</div>}
              navStyle="gm"
            >

              <Group
                noPadded
              >
                <List>
                  {this.props.sijiaos.map(function (w, k) {
                    return (
                      <List.Item
                        key={k}
                        href={"/vip/"+w.userid}
                        media={<img width="80" src={w.headimg}/>} title={w.username}
                        desc={<div><span style={{color: 'red'}}>手机号：{w.tel}</span></div>}
                        subTitle={<label>真实姓名：{w.truename}</label>}
                        after={w.cday + ' ' + w.cstime + '-' + w.cetime}
                      >
                      </List.Item>
                    )
                  })}
                </List>
              </Group>
            </Tabs.Item>
          </Tabs>
        </div>
      )
    }
    if (this.props.pageState == 'loading') {
      return(
        <Card className="trainer-no" style={{height:"200px"}}>
        <Loader amStyle='success'></Loader>
        </Card>
      )
    }
    if (this.props.pageState == 'error') {
      return (
        <Card className="trainer-no">
        亲，您不是教练吧，这是教练专属页面奥！<br/>
        <label style={{fontSize:"10rem"}}>{this.props.hrefTimes}</label>
        </Card>
      )
    }
  }
}
Trainer.propTypes = {
  trainer: PropTypes.object.isRequired,
  initTrainer: PropTypes.func.isRequired,
  tuankes: PropTypes.array.isRequired,
  sijiaos: PropTypes.array.isRequired,
  initCourses: PropTypes.func.isRequired,
  tuankesClick: PropTypes.func.isRequired,
  sijiaosClick: PropTypes.func.isRequired,
  pageState: PropTypes.string.isRequired,
  hrefTimes:PropTypes.number.isRequired,
}

