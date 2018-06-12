import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBusesQuery } from '../queries/queries';
import { Link } from 'react-router-dom'


// components
import { Card } from 'semantic-ui-react'

class BusList extends Component {
    displayBuses(){
        const data = this.props.data;
        if(data.loading){
            return( <div>Loading...</div> );
        } else {
            return data.buses.map(bus => {
                return(
                    <Card as="div" key={ bus.id } onClick={()=>this.props.onBusClick(bus.id)} fluid >
                        <Card.Content>
                        <Card.Header>{ bus.route }</Card.Header>
                        <Card.Meta>{bus.date}</Card.Meta>
                        <Card.Meta>{bus.time}</Card.Meta>
                        <Card.Description>{bus.description}</Card.Description>
                        </Card.Content>
                        <Link to="/bus" className="divLink" />
                    </Card>
                );
            })
        }
    }
    render(){
        return(
            <div>
                { this.displayBuses() }
            </div>
        );
    }
}

export default graphql(getBusesQuery, {
    options: (props) => {
        return {
            variables: {
                date: props.date
            }
        }
    }
})(BusList);
