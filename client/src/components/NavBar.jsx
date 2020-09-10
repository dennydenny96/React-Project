import React, { Component } from 'react'
import Links from './Links'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class NavBar extends Component {
    render() {
        return (
            <Collapse>
                <Links />
            </Collapse>            
        )
    }
}

export default NavBar