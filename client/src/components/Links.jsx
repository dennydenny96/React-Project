import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Item = styled.ul.attrs({
    className: 'collpase navbar-collapse list-unstyled components',
})`
`

// =================================================================================================

const Wrapper = styled.div.attrs({
    className: 'navbar-brand',
})``

const NavLink = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

class Links extends Component {
    constructor(props) {
        super(props);
        this.state = {
          subMenu: false,
          menu: ""
        };
     
        this.onSetSubMenu = this.onSetSubMenu.bind(this);
    }

    onSetSubMenu(menuRoot) {
        if(menuRoot === this.state.menu){
            this.setState(() => ({ 
                subMenu: false,
                menu: ""
            }));
        } else {
            this.setState(() => ({ 
                subMenu: true,
                menu: menuRoot
            }));
        }
    }

    render() {
        const show = (this.state.subMenu) ? "show" : "" ;
        const collapse = (!this.state.subMenu) ? "collapsed" : "";
        const menu = this.state.menu
        return (
            <React.Fragment>
                <NavLink>
                    <Wrapper>
                        <img src={logo} width="50" height="50" alt="sambarros.com" />
                        <Link to="/" className="navbar-brand">
                            MERN Web
                        </Link>
                    </Wrapper>
                </NavLink>
                <Item>
                <li className="ul-li-active">
                        <a href="#newSubmenu" data-toggle="collapse" 
                        className={"dropdown-toggle " + collapse} 
                        onClick={() => this.onSetSubMenu("newSubmenu")}>
                            <FontAwesomeIcon icon="cogs" />
                            &nbsp;New Sub Menu
                        </a>
                        <ul className={"list-unstyled collapse " + (menu === "newSubmenu" ? show : "")}>
                            <li>
                                <Link to="/orders/list" className="nav-link">
                                    Order
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className="ul-li-active">
                        <a href="#settingSubmenu" data-toggle="collapse" 
                        className={"dropdown-toggle " + collapse} 
                        onClick={() => this.onSetSubMenu("settingSubmenu")}>
                            <FontAwesomeIcon icon="cogs" />
                            &nbsp;Setting
                        </a>
                        <ul className={"list-unstyled collapse " + (menu === "settingSubmenu" ? show : '')}>
                            <li>
                                <Link to="/users/list" className="nav-link">
                                    Users 1
                                </Link>
                            </li>
                            <li>
                                <Link to="/users/list" className="nav-link">
                                    Users 2
                                </Link>
                            </li>
                            <li>
                                <Link to="/users/list" className="nav-link">
                                    Users 3
                                </Link>
                            </li>
                        </ul>
                    </li>
                </Item>
                
            </React.Fragment>
        )
    }
}

export default Links