import React, { Component, PropTypes } from 'react'
import  { Link } from 'react-router'

import {
  ButtonGroup, Button, Card, OffCanvasTrigger, OffCanvas, Icon
} from 'amazeui-touch'
import Helmet from 'react-helmet'

export default class Personal extends Component {

  header = (headimg) => {
    return (
      <Card.Child cover={window.SERVER_URL + headimg}>
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

  componentWillMount () {
    this.props.initTrainers()
  }

  render () {
    let personal = this
    return (
      <div className="">
        <Helmet
          title="约私教"
        />
        {this.props.trainers.map(function (w, k) {
          return (<Card key={w.id}
                        header={personal.header(w.headimg)}>
            <h3>
              {w.tname} <label style={{marginLeft: '20px'}}>{w.sign}</label>
              <Link to={'/personalView/' + w.id} style={{float: 'right'}}><Button amStyle="alert">约我</Button></Link>

            </h3>
          </Card>)
        })}
      </div>)
  }
}
Personal.propTypes = {
  trainers: PropTypes.array.isRequired,
  initTrainers: PropTypes.func.isRequired
}

