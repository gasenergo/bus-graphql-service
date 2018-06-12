import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import sortBy from 'lodash/sortBy';
import uniqBy from 'lodash/uniqBy';
import { getBusQuery } from '../queries/queries';

// components
import { Button, Segment } from 'semantic-ui-react'

class BusDetails extends Component {
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
                    <h2>{ data.bus.route }</h2>
                    <p>{ data.bus.date }</p>
                    <p>{ data.bus.time }</p>
                    <p>All passengers:</p>
                    <Segment className={data.bus.vehicle} >
                        { passengers.map(passenger => {
                            return <Button key={passenger.id} onClick={()=>this.props.onSeatClick(passenger.seatNum)} disabled = {passenger.name !== null}>{ passenger.seatNum }{passenger.name}</Button>
                        })}
                    </Segment>
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

export default graphql(getBusQuery, {
    options: (props) => {
        return {
            variables: {
                id: props.busId
            }
        }
    }
})(BusDetails);
