import React, { Component } from 'react'
import api from '../../api/api-server'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Combobox } from 'react-widgets'
import 'react-widgets/dist/css/react-widgets.css';
import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class OrdersInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            customername: '',
            quantity: '',
            containersize: '',
            destination: '',
            price: '',
            reimbursement: '',
            fields: {},
            errors: {},
            customers: [],
            destinations: [],
            prices: []
        }
    }

    handleValidation(msg, stateFields){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        stateFields.map((element, index)=>{
            if(!fields[element]){
                formIsValid = false;
                errors[element] = msg[element]
            }
            return index;
        })

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChangeInputCustomerName = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event;        
        const customername = event;
        let payload = { filtered: {"customername": event}}
        await api.getCustomerByName(payload).then(customerDetails => {
            let getCustomersDestination = []
            customerDetails.data.data.map((element, index)=>{
                getCustomersDestination.push(element.destination)
                return index;
            })
            this.setState({
                destinations: getCustomersDestination,
                customername, 
                fields
            })
            this.handleChangeInputDestination("destination", getCustomersDestination[0])
        })
    }

    handleChangeInputQuantity = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const quantity = event.target.value
        this.setState({ quantity, fields })
    }
    
    handleChangeInputContainerSize = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const containersize = event.target.value
        this.setState({ containersize, fields })
    }
    
    handleChangeInputDestination = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event;
        const destination = event
        let payload = { filtered: {"customername": this.state.customername, "destination": event}}
        await api.getCustomerByName(payload).then(customerDetails => {
            let getCustomersPrice = []
            customerDetails.data.data.map((element, index)=>{
                getCustomersPrice.push(element.price)
                return index;
            })
            this.setState({
                prices: getCustomersPrice,
                price: getCustomersPrice[0],
                fields
            })
        })
        this.setState({ destination, fields })
    }

    handleChangeInputPrice = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event;
        const price = event
        this.setState({ price, fields })
    }
    
    handleChangeInputReimbursement = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const reimbursement = event.target.value
        this.setState({ reimbursement, fields })
    }

    handleIncludeOrder = async () => {
        const { customername, quantity, containersize, destination, price, reimbursement } = this.state
        let payload = { customername, quantity, containersize, destination, price, reimbursement }
        
        await api.insertOrder(payload).then(res => {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: res.data.message,
                onClose: () => {
                    window.location = '/orders/list';
                }
            })
        }).catch(error => {
            this.handleValidation(error.response.data.errMessages, 
                ["customername", "quantity", "containersize", "destination", "price", "reimbursement"])
        })
    }

    componentDidMount = async () => {
        let payload = { filtered: "customername"}
        await api.getCustomersDistinct(payload).then(customers => {
            this.setState({
                customers: customers.data.data,
                customername: customers.data.data[0]
            })
        })
        this.handleChangeInputCustomerName("customername", this.state.customername)
    }

    render() {
        const { customers, destinations, prices, quantity, containersize, reimbursement } = this.state
        return (
            <Wrapper>
                <Title>Create Order</Title>

                <Label>Customer: </Label>
                <Combobox
                data={customers}
                value={this.state.customername}
                defaultValue={customers[0]}
                textField='customername'
                caseSensitive={false}
                minLength={1}
                onChange={this.handleChangeInputCustomerName.bind(this, "customername")}
                filter='contains'
                />
                <span style={{color: "red"}}>{this.state.errors["customername"]}</span>
                <br/>
                
                <Label>Qty: </Label>
                <InputText
                    type="text"
                    value={quantity}
                    onChange={this.handleChangeInputQuantity.bind(this, "quantity")}
                />
                <span style={{color: "red"}}>{this.state.errors["quantity"]}</span>
                <br/>

                <Label>Container Size: </Label>
                <InputText
                    type="text"
                    value={containersize}
                    onChange={this.handleChangeInputContainerSize.bind(this, "containersize")}
                />
                <span style={{color: "red"}}>{this.state.errors["containersize"]}</span>
                <br/>

                <Label>Destination: </Label>
                <Combobox
                data={destinations}
                value={this.state.destination}
                defaultValue={destinations[0]}
                textField='destination'
                caseSensitive={false}
                minLength={1}
                onChange={this.handleChangeInputDestination.bind(this, "destination")}
                filter='contains'
                />
                <span style={{color: "red"}}>{this.state.errors["destination"]}</span>
                <br/>

                <Label>Price: </Label>
                <Combobox
                disabled
                data={prices}
                value={this.state.price}
                defaultValue={prices[0]}
                textField='price'
                caseSensitive={false}
                minLength={1}
                onChange={this.handleChangeInputPrice.bind(this, "price")}
                filter='contains'
                />
                <span style={{color: "red"}}>{this.state.errors["price"]}</span>
                <br/>
                <Label>Reimbursement: </Label>
                <InputText
                    type="text"
                    value={reimbursement}
                    onChange={this.handleChangeInputReimbursement.bind(this, "reimbursement")}
                />
                <span style={{color: "red"}}>{this.state.errors["reimbursement"]}</span>
                <br/>
                <Button onClick={this.handleIncludeOrder}>Add Order</Button>
                <CancelButton href={'/orders/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default OrdersInsert