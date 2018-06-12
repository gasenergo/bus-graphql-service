import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addPassengerMutation, getBusQuery } from '../queries/queries';
import { Button, Form } from 'semantic-ui-react'

class AddPassenger extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            phone: '',
        };
    }
    
    submitForm(e){
        e.preventDefault();
        this.props.addPassengerMutation({
            variables: {
                name: this.state.name,
                phone: this.state.phone,
                seatNum: this.props.seatNum,
                busId: this.props.busId,
            },
            refetchQueries: [{ query: getBusQuery }]
        });
        console.log("success")
    }
    render(){
        return(
            <Form onSubmit={ this.submitForm.bind(this) }>
                <Form.Field>
                    <label>Name</label>
                    <input placeholder='Name' type="text" onChange={ (e) => this.setState({ name: e.target.value }) } />
                </Form.Field>
                <Form.Field>
                    <label>Phone</label>
                    <input placeholder='Phone' type="number" onChange={ (e) => this.setState({ phone: e.target.value }) } />
                </Form.Field>
                <Button type='submit'>Submit</Button>
            </Form>
        );
    }
}

export default compose(
    graphql(getBusQuery, { name: "getBusQuery" }),
    graphql(addPassengerMutation, { name: "addPassengerMutation" })
)(AddPassenger);
