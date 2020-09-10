import React, { Component } from 'react'
import api from '../../api/api-server'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
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
            itemname: '',
            itemsize: '',
            itemquantity: '',
            itemdestination: '',
            travellingexpenses: '',
            fields: {},
            errors: {}
        }
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        
        if(!fields["name"]){
            formIsValid = false;
            errors["name"] = "Cannot be empty";
        }

        if(!fields["size"]){
            formIsValid = false;
            errors["size"] = "Cannot be empty";
        }

        if(!fields["quantity"]){
            formIsValid = false;
            errors["quantity"] = "Cannot be empty";
        }

        if(!fields["destination"]){
            formIsValid = false;
            errors["destination"] = "Cannot be empty";
        }

        if(!fields["travellingexpenses"]){
            formIsValid = false;
            errors["travellingexpenses"] = "Cannot be empty";
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChangeInputItemName = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;        
        const itemname = event.target.value
        this.setState({ itemname, fields })
    }

    handleChangeInputItemSize = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const itemsize = event.target.value
        this.setState({ itemsize })
    }
    
    handleChangeInputItemQuantity = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const itemquantity = event.target.value
        this.setState({ itemquantity })
    }
    
    handleChangeInputItemDestination = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const itemdestination = event.target.value
        this.setState({ itemdestination })
    }

    handleChangeInputTravellingExpenses = async (field, event) => {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        const travellingexpenses = event.target.value
        this.setState({ travellingexpenses })
    }

    handleIncludeOrder = async () => {
        const { itemname, itemsize, itemquantity, itemdestination, travellingexpenses } = this.state
        const payload = { itemname, itemsize, itemquantity, itemdestination, travellingexpenses }
        this.handleValidation()
        await api.insertOrder(payload).then(res => {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
                title: <p>{res.data.message}</p>,
                onClose: () => {
                    window.location = '/orders/list';
                }
            })
        }).catch(error => {
            console.log(error.response.data.errormsg)
        })
    }

    render() {
        const { itemname, itemsize, itemquantity, itemdestination, travellingexpenses } = this.state
        return (
            <Wrapper>
                <Title>Create Order</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={itemname}
                    onChange={this.handleChangeInputItemName.bind(this, "name")}
                />
                <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                <br/>
                <Label>Size: </Label>
                <InputText
                    type="text"
                    value={itemsize}
                    onChange={this.handleChangeInputItemSize.bind(this, "size")}
                />
                <span style={{color: "red"}}>{this.state.errors["size"]}</span>
                <br/>
                <Label>Quantity: </Label>
                <InputText
                    type="text"
                    value={itemquantity}
                    onChange={this.handleChangeInputItemQuantity.bind(this, "quantity")}
                />
                <span style={{color: "red"}}>{this.state.errors["quantity"]}</span>
                <br/>
                <Label>Destination: </Label>
                <InputText
                    type="text"
                    value={itemdestination}
                    onChange={this.handleChangeInputItemDestination.bind(this, "destination")}
                />
                <span style={{color: "red"}}>{this.state.errors["destination"]}</span>
                <br/>
                <Label>Travelling Expenses: </Label>
                <InputText
                    type="text"
                    value={travellingexpenses}
                    onChange={this.handleChangeInputTravellingExpenses.bind(this, "travellingexpenses")}
                />
                <span style={{color: "red"}}>{this.state.errors["travellingexpenses"]}</span>
                <br/>
                <Button onClick={this.handleIncludeOrder}>Add Order</Button>
                <CancelButton href={'/orders/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default OrdersInsert