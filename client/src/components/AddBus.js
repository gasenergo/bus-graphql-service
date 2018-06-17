import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addBusMutation,  getBusesQuery } from '../queries/queries';
import { Form, Segment, Header } from 'semantic-ui-react'
import DayPicker from 'react-day-picker';

class AddBus extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            time: '',
            route: '',
            vehicle: '',
            description: ''
        };
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleDayClick(day) {
        this.setState({ date: day });
    }
    handleChange(e, { name, value }) {
        this.setState({ [name]: value });
    }
    submitForm(e){
        e.preventDefault();
        this.props.addBusMutation({
            variables: {
                date: this.state.date.toLocaleDateString("en-GB"),
                time: this.state.time,
                route: this.state.route,
                vehicle: this.state.vehicle,
                description: this.state.description
            },
            refetchQueries: [{ query: getBusesQuery,variables: ({date: this.state.date.toLocaleDateString("en-GB")}) }]
        });

    }
    render(){
        const { route, time, description} = this.state
        const vehicles = [
            {key: '1', text: 'Car', value: 'car'},
            {key: '2', text: 'Iveco', value: 'iveco'}
        ]
        return(
            <div>
                <Segment raised className='calendarBlock'>
                    <div className='date'>
                        <Header as='h1'>{this.state.date.getDate()}</Header>
                        <Header as='h3'>{this.state.date.toLocaleString('en-es', { month: "long" })}</Header> 
                    </div>
                    <div className='calendar'>
                        <DayPicker onDayClick={this.handleDayClick} />
                    </div>
                </Segment>
                <Form onSubmit={ this.submitForm.bind(this) }>
                    <Form.Input placeholder='Route' name='route' value={route} onChange={this.handleChange} />
                    <Form.Input placeholder='Time' name='time' value={time} onChange={this.handleChange} />
                    <Form.Select placeholder='Vehicle' name='vehicle' options={vehicles} onChange={this.handleChange} />
                    <Form.TextArea placeholder='Description' name='description' value={description} onChange={this.handleChange} />
                    <Form.Button content='Submit' />
                </Form>
            </div>
        );
    }
}

export default compose(
    graphql(addBusMutation, { name: "addBusMutation" })
)(AddBus);


