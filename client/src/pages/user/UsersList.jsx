import React, { Component } from 'react';
import ReactTable from "react-table";
import api from '../../api/api-server';
import styled from 'styled-components';
import "react-table/react-table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { filterFunction } from '../../helpers/functions'

const Toolbars = styled.div.attrs({
    className: `row`
})``

const Create = styled.div.attrs({
    className: `btn btn-success`
})`
    margin-bottom: 6px;
    float: right;
    cursor: pointer;
`

const Update = styled.div.attrs({
    className: `btn btn-warning`
})`
    cursor: pointer;
`

const Delete = styled.div.attrs({
    className: `btn btn-danger`,
})`
    cursor: pointer;
`

class CreateUser extends Component {
    createUser = event => {
        event.preventDefault()

        window.location.href = `/users/create`
    }

    render() {
        return <Toolbars>
                <div className="col-md-12">
                    <Create onClick={this.createUser}>
                        <FontAwesomeIcon icon="plus" /> Create User
                    </Create>
                </div>
        </Toolbars>
            
    }
}

class UpdateUser extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/users/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>
                <FontAwesomeIcon icon="edit" />
            </Update>
    }
}

class DeleteUser extends Component {
    deleteUser = event => {
        event.preventDefault()
        
        if (
            window.confirm(
                `Do tou want to delete the user ---"${this.props.username}"--- permanently?`,
            )
        ) {
            api.deleteUserById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>
                <FontAwesomeIcon icon="trash-alt" />
            </Delete>
    }
}

class UsersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            columns: [],
            isLoading: false,
            pages: 0,
            pageSize: 10,
            filtered: ""
        }
    }

    componentDidMount = async (newState) => {
        this.setState({ isLoading: true })
        if(!newState){
            newState = {}
        }

        let payload = {
            page: newState.page,
            pageSize: newState.pageSize,
            sorted: newState.sorted,
            filtered: newState.filtered
        }
        await api.getAllUsers(payload).then(users => {
            this.setState({
                users: users.data.data,
                isLoading: false,
                pages: users.data.pages
            })
        })
    }

    render() {
        const { users, isLoading, pages } = this.state
        // console.log('TCL: UsersList -> render -> users', this.state)

        const columns = [
            {
                Header: 'First Name',
                accessor: 'firstname',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Last Name',
                accessor: 'lastname',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Username',
                accessor: 'username',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Email',
                accessor: 'email',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Actions',
                accessor: '',
                className: 'text-center',
                sortable: false,
                Cell: function(props) {
                    if(props.original._id === undefined){
                        return <span></span>
                    }
                    return (
                        <span>
                            <UpdateUser id={props.original._id} />
                            <DeleteUser id={props.original._id} username={props.original.username} />
                        </span> 
                    )
                },
            }
        ]

        return (
            <div className="card">
                <div className="card-header">
                    <FontAwesomeIcon icon="align-justify" />
                    &nbsp;List of Users
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <CreateUser />
                                <ReactTable
                                    className="-striped -highlight"
                                    pages={pages}
                                    data={users}
                                    columns={columns}
                                    loading={isLoading}
                                    defaultPageSize={10}
                                    showPagination={true}
                                    showPageSizeOptions={true}
                                    pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                                    minRows={0}
                                    manual // this would indicate that server side pagination has been enabled 
                                    onFetchData={(state, instance) => {
                                        // console.log(state.page, state.pageSize)
                                        // console.log(state.filtered, state.sorted)
                                        this.componentDidMount(state)
                                    }}
                                />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UsersList
