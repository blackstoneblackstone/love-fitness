import React from 'react'
import ReactDOM from 'react-dom'
import { getCookie, setCookie, getQueryString } from './utils'
import { userInfo } from './store/userinfo'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'
window.__DEV__ = true
let userid = getQueryString('u')
if (userid === '' || userid == null) {
  if (getCookie('gmuser') == null || getCookie('gmuser') === '') {
    let sourceUrl = document.URL
    window.location.href = 'http://www.gm-fitness.com/index.php?g=Restful&m=Oauth&a=login&sourceUrl=' + sourceUrl
  } else {
    userid = getCookie('gmuser')
  }
} else {
  setCookie('gmuser', userid)
}
window.userid = userid
window.SERVER_URL = '/server/'

const store = createStore()
userInfo(store)

const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = require('./routes/index').default(store)
  ReactDOM.render(
    <AppContainer store={store} routes={routes} />,
        MOUNT_NODE
    )
}

if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// 将报错展示在页面上
if (__DEV__) {
  if (module.hot) {
        // Development render functions
    const renderApp = render
    const renderError = (error) => {
      const RedBox = require('redbox-react').default

      ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
    }

    render = () => {
      try {
        renderApp()
      } catch (error) {
        console.error(error)
        renderError(error)
      }
    }

        // Setup hot module replacement
    module.hot.accept('./routes/index', () =>
            setImmediate(() => {
              ReactDOM.unmountComponentAtNode(MOUNT_NODE)
              render()
            })
        )
  }
}

render()
