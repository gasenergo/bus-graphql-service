import { gql } from 'apollo-boost';

const getBusesQuery = gql`
    query GetBuses($date:String!){
        buses(date:$date) {
            id
            route
            date
            time
            description
        }
    }
`;
const getBusQuery = gql`
    query GetBus($id: ID){
        bus(id: $id) {
            id
            vehicle
            passengers {
                id
                name
                phone
                seatNum
            }
        }
    }
`;

const addPassengerMutation = gql`
    mutation AddPassenger($name: String!, $phone: String!, $seatNum: Int!, $busId: ID!){
        addPassenger(name: $name, phone: $phone, seatNum: $seatNum, busId: $busId){
            name
            id
        }
    }
`;

const addBusMutation = gql`
    mutation AddBus($date: String!, $time: String!, $route: String!, $vehicle: String!, $description: String!){
        addBus(date: $date, time: $time, route: $route, vehicle: $vehicle, description: $description){
            id
            route
            date
            time
            description
        }
    }
`;

export { getBusQuery, getBusesQuery, addPassengerMutation, addBusMutation };
