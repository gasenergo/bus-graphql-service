import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addPassengerMutation, getBusQuery } from '../queries/queries';
import { Button, Form, Segment  } from 'semantic-ui-react'
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';


class Bus extends Component {
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
            refetchQueries: [{ query: getBusQuery,variables: ({id: this.props.busId}) }]
        });
    }

    displayBusDetails(){
        const data = this.props.data;
        if(data.loading){
            return( <div>Loading ...</div> );
        } else {
            let dummyPassengers;
            switch(data.bus.vehicle){
                case "car" :
                    dummyPassengers = [
                        {id:1, name: null, phone: null, seatNum: 1},
                        {id:2, name: null, phone: null, seatNum: 2},
                        {id:3, name: null, phone: null, seatNum: 3},
                        {id:4, name: null, phone: null, seatNum: 4}
                    ]
                    break;
                case "iveco" :
                    dummyPassengers = [
                        {id:1, name: null, phone: null, seatNum: 1},
                        {id:2, name: null, phone: null, seatNum: 2},
                        {id:3, name: null, phone: null, seatNum: 3},
                        {id:4, name: null, phone: null, seatNum: 4},
                        {id:5, name: null, phone: null, seatNum: 5},
                        {id:6, name: null, phone: null, seatNum: 6}
                    ]
                    break;
                default:
                    dummyPassengers = [
                        {id:1, name: null, phone: null, seatNum: 1},
                        {id:2, name: null, phone: null, seatNum: 2},
                        {id:3, name: null, phone: null, seatNum: 3},
                    ]
            }
            let passengers = sortBy(uniqBy([...data.bus.passengers,...dummyPassengers],'seatNum'), p => p.seatNum)
            return(
                <div>
                    <Segment className={data.bus.vehicle} >
                        { passengers.map(passenger => {
                            return <Button key={passenger.id} onClick={()=>this.props.onSeatClick(passenger.seatNum)} disabled = {passenger.name !== null}>{ passenger.seatNum }</Button>
                        })}
                    </Segment>
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
                </div>
            );
        }
    }

    render(){
        return(
            <div>
                { this.displayBusDetails() }
            </div>
        );
    }
}

export default compose(
    graphql(getBusQuery, {
        options: (props) => {
            return {
                variables: {
                    id: props.busId
                }
            }
        }
    }),
    graphql(addPassengerMutation, { name: "addPassengerMutation" })
)(Bus);









