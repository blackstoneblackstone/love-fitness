import React, {PropTypes} from 'react'
import Footer from '../components/Footer'
import {
    Container,
} from 'amazeui-touch'

import '../styles/core.scss'

export const CoreLayout = ({children}) => {

    return (
        <Container scrollable id="mainCon">
            <div className='core-layout__viewport'>
                {children}
            </div>
            <Footer/>
        </Container>
    )
}

CoreLayout.propTypes = {
    children: PropTypes.element.isRequired
}

export default CoreLayout
