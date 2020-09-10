import React, { Component } from 'react'
import api from '../../api/api-server'
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
            travellingexpenses: ''
        }
    }

    handleChangeInputItemName = async event => {
        const itemname = event.target.value
        this.setState({ itemname })
    }

    handleChangeInputItemSize = async event => {
        const itemsize = event.target.value
        this.setState({ itemsize })
    }
    
    handleChangeInputItemQuantity = async event => {
        const itemquantity = event.target.value
        this.setState({ itemquantity })
    }
    
    handleChangeInputItemDestination = async event => {
        const itemdestination = event.target.value
        this.setState({ itemdestination })
    }

    handleChangeInputTravellingExpenses = async event => {
        const travellingexpenses = event.target.value
        this.setState({ travellingexpenses })
    }

    handleIncludeOrder = async () => {
        const { itemname, itemsize, itemquantity, itemdestination, travellingexpenses } = this.state
        const payload = { itemname, itemsize, itemquantity, itemdestination, travellingexpenses }
        
        await api.insertOrder(payload).then(res => {
            console.log(res)
            window.alert(`Order created successfully`);
            window.location = '/orders/list';
        }).catch(error => {
            console.log(error)
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
                    onChange={this.handleChangeInputItemName}
                />

                <Label>Size: </Label>
                <InputText
                    type="text"
                    value={itemsize}
                    onChange={this.handleChangeInputItemSize}
                />

                <Label>Quantity: </Label>
                <InputText
                    type="text"
                    value={itemquantity}
                    onChange={this.handleChangeInputItemQuantity}
                />

                <Label>Destination: </Label>
                <InputText
                    type="text"
                    value={itemdestination}
                    onChange={this.handleChangeInputItemDestination}
                />

                <Label>Travelling Expenses: </Label>
                <InputText
                    type="text"
                    value={travellingexpenses}
                    onChange={this.handleChangeInputTravellingExpenses}
                />
                
                <Button onClick={this.handleIncludeOrder}>Add Order</Button>
                <CancelButton href={'/orders/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default OrdersInsert