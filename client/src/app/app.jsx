import React, { Component } from 'react'
import Sidebar from "react-sidebar";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import { NavBar } from '../components'
import { UsersList, UsersInsert, UsersUpdate } from '../pages/user'
import { OrdersList, OrdersInsert, OrdersUpdate } from '../pages/order'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../style/custom.css'
import styled from 'styled-components'

const Main = styled.main.attrs({
    className: 'ml-sm-auto',
})``

const NavBarTop = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light bg-light col-md-12'
})``

const Container = styled.div.attrs({
    className: 'container',
})``

const ContainerFluid = styled.div.attrs({
    className: 'container-fluid'
})``

const SidebarCollapse = styled.button.attrs({
    className: 'btn btn-info',
    type: 'button'
})``

const NavbarSupportedContent = styled.button.attrs({
    className: 'btn btn-dark d-inline-block d-lg-none ml-auto',
    type: 'button',
})``

const mql = window.matchMedia(`(min-width: 800px)`);
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          sidebarDocked: mql.matches,
          sidebarOpen: true
        };
     
        this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    }
    
    componentDidMount() {
        mql.addListener(this.mediaQueryChanged);
    }
    
    componentWillUnmount() {
        this.state.mql.removeListener(this.mediaQueryChanged);
    }
    
    onSetSidebarOpen() {
        this.setState((prevState) => ({ sidebarOpen: !prevState.sidebarOpen }));
    }
    
    mediaQueryChanged() {
        this.setState((prevState) => ({ sidebarDocked: mql.matches, sidebarOpen: prevState.sidebarOpen }));
    }

    render() {
        return (
            <Router>
                <Container>
                    <Sidebar
                        sidebar={this.state.sidebarOpen && <NavBar />}
                        open={this.state.sidebarOpen}
                        docked={this.state.sidebarDocked}
                        onSetOpen={this.onSetSidebarOpen}
                        styles={{ sidebar: { 
                                    background: "#47748b"
                                    } 
                                }}
                    >
                        <Main role="main">
                            <ContainerFluid>
                                <div className="animated fadeIn">
                                    <div className="row">
                                        <NavBarTop>
                                            <SidebarCollapse onClick={() => this.onSetSidebarOpen()}>
                                                <FontAwesomeIcon icon="align-justify" />
                                            </SidebarCollapse>
                                            <NavbarSupportedContent data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                <FontAwesomeIcon icon="align-justify" />
                                            </NavbarSupportedContent>
                                        </NavBarTop>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12">
                                            <Switch>
                                                {/* ------------- User ------------- */}
                                                <Route path="/users/list" exact component={UsersList} />
                                                <Route path="/users/create" exact component={UsersInsert} />
                                                <Route
                                                    path="/users/update/:id"
                                                    exact
                                                    component={UsersUpdate}
                                                />

                                                {/* ------------- Order ------------- */}
                                                <Route path="/orders/list" exact component={OrdersList} />
                                                <Route path="/orders/create" exact component={OrdersInsert} />
                                                <Route
                                                    path="/orders/update/:id"
                                                    exact
                                                    component={OrdersUpdate}
                                                />
                                            </Switch>
                                        </div>
                                    </div>
                                </div>
                            </ContainerFluid>
                        </Main>
                    </Sidebar>
                </Container>
            </Router>
        )
    }
}

export default App