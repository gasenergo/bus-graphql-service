import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom'

// components
import { Header, Container, Segment} from 'semantic-ui-react'
import BusList from './components/BusList';
import Bus from './components/Bus';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import AddBus from './components/AddBus';


// apollo client setup
const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date(),
            selectedBus: null,
            selectedSeat: null
        };
        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleBusClick = this.handleBusClick.bind(this);
        this.handleSeatClick = this.handleSeatClick.bind(this);
    }
    handleDayClick(day) {
        this.setState({ date: day });
    }
    handleBusClick(bus) {
        this.setState({ selectedBus: bus });
    }
    handleSeatClick(seat) {
        this.setState({ selectedSeat: seat });
    }
    
    render() {
        return (
            <Router>
            <ApolloProvider client={client}>
                <Container text>
                    <Switch>
                        <Route path="/" exact render={(props)=>
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
                                <BusList date={this.state.date.toLocaleDateString("en-GB")} onBusClick={this.handleBusClick}/>
                                <Link className='addBusLink' to="/addbus">+</Link>
                            </div>
                        } />
                        <Route path="/bus" render = {(props) =><Bus busId={this.state.selectedBus} onSeatClick={this.handleSeatClick} seatNum={this.state.selectedSeat}/>} />
                        <Route path="/addbus" component={AddBus} />
                        <Redirect to="/" />
                    </Switch>  
                </Container>
            </ApolloProvider>
            </Router>
        );
    }
}

export default App;
