import React, { Component } from 'react';
import ReactTable from "react-table";
import api from '../../api/api-server';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import styled from 'styled-components';
import "react-table/react-table.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { filterFunction, toCurrency } from '../../helpers/functions'

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

class CreateOrder extends Component {
    createOrder = event => {
        event.preventDefault()

        window.location.href = `/orders/create`
    }

    render() {
        return <Toolbars>
                <div className="col-md-12">
                    <Create onClick={this.createOrder}>
                        <FontAwesomeIcon icon="plus" /> Create Order
                    </Create>
                </div>
        </Toolbars>
            
    }
}

class UpdateOrder extends Component {
    updateOrder = event => {
        event.preventDefault()

        window.location.href = `/orders/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateOrder}>
                <FontAwesomeIcon icon="edit" />
            </Update>
    }
}

class DeleteOrder extends Component {
    deleteOrder = event => {
        event.preventDefault()
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: `Do tou want to delete the order ${this.props.customername} permanently?`,
            showCancelButton: true,
            confirmButtonText: `Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                api.deleteOrderById(this.props.id);
                MySwal.fire({
                    title: `Delete ${this.props.customername} success!`,
                    onClose: () => {
                        window.location.reload()
                    }
                });
            }
        })
    }

    render() {
        return <Delete onClick={this.deleteOrder}>
                <FontAwesomeIcon icon="trash-alt" />
            </Delete>
    }
}

class OrdersList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
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
        await api.getAllOrders(payload).then(orders => {
            this.setState({
                orders: orders.data.data,
                isLoading: false,
                pages: orders.data.pages
            })
        })
    }

    render() {
        const { orders, isLoading, pages } = this.state

        const columns = [
            {
                Header: "No",
                maxWidth: 50,
                filterable: false,
                className: 'text-center',
                Cell: (row) => {
                  return <div>{row.index+1}</div>;
                }
            },
            {
                Header: 'Customer',
                accessor: 'customername',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Qty',
                accessor: 'quantity',
                filterable: true,
                className: 'text-center',
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Container Size',
                accessor: 'containersize',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Destination',
                accessor: 'destination',
                filterable: true,
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Price',
                accessor: 'price',
                className: 'text-right',
                filterable: true,
                Cell: (props) => {
                    return <div>{toCurrency(props.value)}</div>;
                },
                Filter: cell => (filterFunction(cell))
            },
            {
                Header: 'Reimbursement',
                accessor: 'reimbursement',
                className: 'text-right',
                filterable: true,
                Cell: (props) => {
                    return <div>{toCurrency(props.value)}</div>;
                },
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
                            <UpdateOrder id={props.original._id} />
                            <DeleteOrder id={props.original._id} customername={props.original.customername} />
                        </span> 
                    )
                },
            }
        ]

        return (
            <div className="card">
                <div className="card-header">
                    <FontAwesomeIcon icon="align-justify" />
                    &nbsp;List of Orders
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <CreateOrder />
                                <ReactTable
                                    className="-striped -highlight"
                                    pages={pages}
                                    data={orders}
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

export default OrdersList
