import React, { Component, PropTypes } from 'react'
import {
  Card
} from 'amazeui-touch'
import Helmet from 'react-helmet'
import qr from 'qr-image'
import svgpath from 'svgpath'

export default class Check extends Component {

  state = {
    path: ''
  }

  componentWillMount () {
    const originPath = qr.svgObject(this.props.userid + '').path
    const scaledPath = svgpath(originPath).scale(5, 5).toString()
    this.setState({path: scaledPath})
  }

  render () {
    let check = this
    return (
      <div className="check">
        <Helmet
          title="签到"
        />
        <img src={this.props.userInfo.head_img} className="headimg"/>
        <h2>请将该二维码出示给前台工作人员</h2>
        <Card>
          <svg ref={(ref) => this._qrcodeSVG = ref} transform="scale(2)" style={{
            marginLeft: '190px',
            marginTop: '100px',
            marginBottom: '30px',
            webkitTransform:"scale(2)"
          }}>
            <path d={this.state.path ? this.state.path : null}/>
          </svg>
        </Card>
      </div>)
  }
}
Check.propTypes = {
  userInfo: PropTypes.object.isRequired,
  userid:PropTypes.number.isRequired
}

